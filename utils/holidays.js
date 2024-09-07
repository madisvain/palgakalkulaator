import dayjs from "dayjs";
import { t } from "@lingui/macro";

const calculateEaster = (year) => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return dayjs(`${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
};

const isHoliday = (date, monthHolidays) => {
  if (!monthHolidays) return false;
  return monthHolidays.some((holiday) => holiday.date.isSame(date, "day"));
};

const getHoliday = (date, monthHolidays) => {
  if (!monthHolidays) return null;
  return monthHolidays.find((holiday) => holiday.date.isSame(date, "day"));
};

export const getHolidaysByMonth = (year) => {
  const easterSunday = calculateEaster(year);
  const goodFriday = easterSunday.subtract(2, "day");
  const pentecost = easterSunday.add(49, "day");

  const holidays = [
    { name: t`Uusaasta`, date: dayjs(`${year}-01-01`), reducedHours: true },
    { name: t`Iseseisvuspäev`, date: dayjs(`${year}-02-24`), reducedHours: true },
    { name: t`Suur reede`, date: goodFriday, reducedHours: false },
    { name: t`Ülestõusmispühade 1. püha`, date: easterSunday, reducedHours: false },
    { name: t`Kevadpüha`, date: dayjs(`${year}-05-01`), reducedHours: false },
    { name: t`Nelipühade 1. püha`, date: pentecost, reducedHours: false },
    { name: t`Võidupüha`, date: dayjs(`${year}-06-23`), reducedHours: true },
    { name: t`Jaanipäev`, date: dayjs(`${year}-06-24`), reducedHours: false },
    { name: t`Taasiseseisvumispäev`, date: dayjs(`${year}-08-20`), reducedHours: false },
    { name: t`Jõululaupäev`, date: dayjs(`${year}-12-24`), reducedHours: true },
    { name: t`Esimene jõulupüha`, date: dayjs(`${year}-12-25`), reducedHours: false },
    { name: t`Teine jõulupüha`, date: dayjs(`${year}-12-26`), reducedHours: false },
  ];

  const holidaysByMonth = {};

  for (const holiday of holidays) {
    const month = holiday.date.month() + 1; // dayjs months are 0-indexed
    if (!holidaysByMonth[month]) {
      holidaysByMonth[month] = [];
    }

    const dayOfWeek = holiday.date.day(); // 0 is Sunday, 6 is Saturday

    holidaysByMonth[month].push({
      name: holiday.name,
      date: holiday.date,
      isWorkday: dayOfWeek > 0 && dayOfWeek < 6,
    });
  }

  return holidaysByMonth;
};

export const getWorkingdaysByMonth = (year) => {
  const holidaysByMonth = getHolidaysByMonth(year);
  const workingdaysByMonth = {};

  for (let month = 1; month <= 12; month++) {
    const daysInMonth = dayjs(`${year}-${month.toString().padStart(2, "0")}-01`).daysInMonth();
    const workingdays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = dayjs(`${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
      const dayOfWeek = currentDate.day(); // 0 is Sunday, 6 is Saturday

      // Check if it's a weekday (Monday to Friday) and not a holiday
      if (dayOfWeek > 0 && dayOfWeek < 6 && !isHoliday(currentDate, holidaysByMonth[month])) {
        workingdays.push({
          date: currentDate,
          dayOfWeek: dayOfWeek,
        });
      }
    }

    workingdaysByMonth[month] = workingdays;
  }

  return workingdaysByMonth;
};

export const getWorkingHoursByMonth = (year) => {
  const holidaysByMonth = getHolidaysByMonth(year);
  const workingHoursByMonth = {};

  for (let month = 1; month <= 12; month++) {
    const daysInMonth = dayjs(`${year}-${month.toString().padStart(2, "0")}-01`).daysInMonth();
    let totalHours = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = dayjs(`${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
      const dayOfWeek = currentDate.day(); // 0 is Sunday, 6 is Saturday

      // Check if it's a weekday (Monday to Friday) and not a holiday
      if (dayOfWeek > 0 && dayOfWeek < 6 && !isHoliday(currentDate, holidaysByMonth[month])) {
        let hoursToday = 8; // Default working hours

        // Check if the next day is a holiday with reduced hours
        const nextDay = currentDate.add(1, "day");
        const nextMonth = nextDay.month() + 1; // dayjs months are 0-indexed
        const nextDayHoliday = getHoliday(nextDay, holidaysByMonth[nextMonth]);

        if (nextDayHoliday && nextDayHoliday.reducedHours) {
          hoursToday -= 3; // Reduce 3 hours if the next day is a holiday with reduced hours
        }

        // Special case for New Year's Eve (last day of the year)
        if (month === 12 && day === 31) {
          hoursToday -= 3;
        }

        totalHours += hoursToday;
      }
    }

    workingHoursByMonth[month] = totalHours;
  }

  return workingHoursByMonth;
};

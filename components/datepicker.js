import { DayPicker } from "react-day-picker";
import { Popover } from "@headlessui/react";
import { format, parse } from "date-fns";

import { et } from "date-fns/locale";

const DatePicker = ({ name, register, setValue, value }) => {
  const onDateSelect = (date, close) => {
    setValue(name, format(date, "dd.MM.yyyy"));
    close();
  };

  return (
    <Popover>
      {({ open, close }) => (
        <>
          <Popover.Button>
            <input
              {...register(name)}
              type="text"
              className="border-transparent bg-beige w-full h-9"
              value={value}
            />
          </Popover.Button>
          <Popover.Panel className="absolute z-10 mt-2 bg-white border shadow-lg">
            <DayPicker
              mode="single"
              selected={parse(value, "dd.MM.yyyy", new Date())}
              onSelect={(date) => onDateSelect(date, close)}
              defaultMonth={parse(value, "dd.MM.yyyy", new Date())}
              locale={et}
              showOutsideDays
            />
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default DatePicker;

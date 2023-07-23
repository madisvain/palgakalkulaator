import { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { Popover } from "@headlessui/react";

import { et } from "date-fns/locale";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState();
  const inputRef = useRef(null);

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button>
            <input
              type="text"
              className="border-transparent bg-beige w-full h-9"
            />
          </Popover.Button>
          <Popover.Panel className="absolute z-10 mt-2 bg-white border shadow-lg">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
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

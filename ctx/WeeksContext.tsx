import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, ReactNode, useEffect } from "react";

type WeeksContextType = {
  weeks: WeeksList;
  setWeeks: React.Dispatch<React.SetStateAction<WeeksList>>;
  getWeekType: (date: Date) => "A" | "B" | null;
};

const defaultValue: WeeksContextType = {
  weeks: [],
  setWeeks: () => {},
  getWeekType: (date: Date) => null,
};

const WeeksContext = createContext<WeeksContextType>(defaultValue);

const WeeksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weeks, setWeeks] = useState<WeeksList>(defaultValue.weeks);

  function getWeekType(date: Date): "A" | "B" | null {
    for (const week of weeks) {
      const startDate = new Date(week.start_date);
      const endDate = new Date(week.end_date);

      const adjustedStartDate = new Date(startDate);
      adjustedStartDate.setDate(startDate.getDate() - 1);

      if (date >= adjustedStartDate && date <= endDate) {
        return week.type;
      }
    }
    return null;
  }

  return (
    <WeeksContext.Provider value={{ weeks, setWeeks, getWeekType }}>
      {children}
    </WeeksContext.Provider>
  );
};

export { WeeksContext, WeeksProvider };

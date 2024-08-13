
interface Class {
  name: string;
  teacher: string;
  class: string;
  startAt: string;
  endAt: string;
  type: string;
  week?: "A" | "B";
}

type Schedule = (Class | Class[])[][];

interface Week {
  type: 'A' | 'B'; 
  start_date: string; 
  end_date: string;   
}

type WeeksList = Week[];

'use client';

import { useState } from 'react';
import CalendarInput from './calendar-input';

export default { title: 'UI/CalendarInput', component: CalendarInput };

export const BasicUsage = {
  render: () => {
    function CalendarInputDemo() {
      const [date, setDate] = useState<string | null>(null);
      return (
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <CalendarInput
            date={date}
            setDate={setDate}
            locale="en"
            placeholder="Pick a date"
          />
        </div>
      );
    }
    return <CalendarInputDemo />;
  },
};

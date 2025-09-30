import React, { useState } from 'react';
import Privacy from '../Privacy/Privacy';
import Terms from '../Terms/Terms';

const AlphaSettings = () => {
  const [clicked, setClicked] = useState(1);

  return (
    <div>
      <div className="flex mx-6 my-6 font-medium gap-7">
        <p
          onClick={() => setClicked(1)}
          className={`${clicked === 1 ? 'text-blue-500' : 'text-black'} text-[32px] cursor-pointer`}
        >
          Terms And Condition
        </p>
        <p
          onClick={() => setClicked(2)}
          className={`${clicked === 2 ? 'text-blue-500' : 'text-black'} text-[32px] cursor-pointer`}
        >
          Privacy Policy
        </p>
      </div>
      {
        clicked === 1 ? <Terms /> : <Privacy />
      }
    </div>
  );
};

export default AlphaSettings;

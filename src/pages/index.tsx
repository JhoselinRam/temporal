import type { NextPage } from 'next'
import { Dispatch, SetStateAction, useRef } from 'react';
import Lineplot from '../components/LinePlot';


const Home: NextPage = () => {
  
  const plot1 = useRef<Dispatch<SetStateAction<Array<[number, number]>>>>(null);
  const plot2 = useRef<Dispatch<SetStateAction<Array<[number, number]>>>>(null);
  const port = useRef<any>();
  const bufferSize = 45;

  async function onClick(){
    port.current = await navigator.serial.requestPort();
    await port.current.open({baudRate:115200});
  }

  function appendValue(value:string){
    if(plot1.current != null){
      if(!isNaN(parseInt(value))){
        plot1.current(data => {
          const index = data.length;
          if(index === bufferSize)
              return [[0, parseInt(value)]]
    
          const newData = data.slice();
          newData.push([index,parseInt(value)]);
          return newData
        });
      }
    }
  }

  async function starReading(){
    while (port.current.readable) {
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.current.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
    
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
          }
          if (value) {
            appendValue(value);
          }
        }
      } catch (error) {
        // TODO: Handle non-fatal read error.
      }
    }
  }

  return (
    <>
      <button type='button' className='my-5 mx-3 px-2 py-1 bg-cyan-500 rounded-md' onClick={onClick}>
          Select port
      </button>
      <button type='button' className='my-5 mx-3 px-2 py-1 bg-cyan-500 rounded-md' onClick={starReading}>
          Start
      </button>
      
      <div className='w-full py-2 flex flex-col items-center justify-center bg-[#f5f2f0] gap-3'>
        <Lineplot ref={plot1}/>
        <Lineplot ref={plot2}/>
      </div>
    </>
  );
}

export default Home
import { select, scaleLinear, axisBottom, axisLeft, line, Selection} from 'd3';
import { Dispatch, forwardRef, Ref, SetStateAction, useEffect, useImperativeHandle, useRef, useState } from 'react';

function LinePlot({}, ref:Ref<Dispatch<SetStateAction<Array<[number,number]>>>>){

    const svgElement = useRef<SVGSVGElement>(null);
    const f1 = useRef<Selection<SVGGElement, unknown, null, undefined>>();
    const [data, setData] = useState<Array<[number,number]>>([]);

    useImperativeHandle(ref, ()=>{
        return setData;
    });

    useEffect(()=>{
        console.log(data);
        if(svgElement.current != null && f1.current != null){
            const axisX = scaleLinear().domain([0,50]).range([0,svgElement.current.clientWidth]);
              const axisY = scaleLinear().domain([0,30]).range([svgElement.current.clientHeight-10,0]);
    
            /* f1.current.append('path') 
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-width', 1.5)
                .attr('d', line().x(d=>axisX(d[0])).y(d=>axisY(d[1]))); */
            
                const dummy = [
                    [0,0],
                    [1,1],
                    [2,2],
                    [3,3],
                    [4,4],
                    [5,5],
                    [6,6],
                    [7,7],
                    [8,8],
                    [9,9],
                    [10,10]
                ];
                
                f1.current
                    .selectAll('circle')
                    .data(data)
                    .enter()
                    .append('circle')
                    .attr('r', '2')
                    .attr('fill', 'steelblue')
                    .attr('cx', d=>`${axisX(d[0])}`)
                    .attr('cy', d=>`${axisY(d[1])}`)
                
                f1.current
                    .selectAll('circle')
                    .data(data)
                    .exit()
                    .remove();
                
                f1.current
                    .select('.graphPath')
                    .datum(data)
                    .attr('d', line().x(d=>axisX(d[0])).y(d=>axisY(d[1])));
        }
    }, [data]);

    useEffect(()=>{
        if(svgElement.current != null){
          const axisX = scaleLinear().domain([0,50]).range([0,svgElement.current.clientWidth]);
          const axisY = scaleLinear().domain([0,17]).range([svgElement.current.clientHeight-10,0]);
          
          f1.current = select(svgElement.current)
                      .append('g')
                      .attr('transform', `translate(30,-10)`);
    
          f1.current.append('g')
            .attr('transform', `translate(0,${svgElement.current.clientHeight - 10})`)
            .call(axisBottom(axisX));
    
          
          f1.current.append('g')
            .call(axisLeft(axisY));

            f1.current.append('path')
            .attr('class', 'graphPath')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5);
    
          /* f1.append('path') 
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', line().x(d=>axisX(d[0])).y(d=>axisY(d[1]))); */
    
        }
      }, []);
    
    return (
        <svg className='w-10/12 h-[400px] bg-white border border-gray-500'
          ref={svgElement}></svg>
    );
}

export default forwardRef(LinePlot);
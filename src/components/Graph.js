import React, { useRef, useState } from 'react';
import Directions from './Directions';
import Fruit from './Fruit';
import Bottom from './Bottom';
import useBounds from '../hooks/useBounds';

const Graph = ({ aggregate, ratings, setRatings, submitRatings }) => {
  const graphRef = useRef();
  const scale = useBounds(graphRef);
  const [showAggregate, setShowAggregate] = useState(false);
  // Just show axis until useBounds is able to determine that info
  if (!scale) {
    return <div ref={graphRef} className="matrix__graph" />;
  }

  // Generates an array of fruit that are OFF the graph.
  // Needed to display fruit spaced out nicely above graph
  const listOfKeysOffGraph = Object.keys(ratings).filter((name) => {
    return !ratings[name];
  });

  // Generate fruit components
  const fruit = Object.keys(ratings).map((name) => {
    return (
      <Fruit
        key={name}
        name={name}
        ratings={ratings}
        setRatings={setRatings}
        scale={scale}
        listOfKeysOffGraph={listOfKeysOffGraph}
      />
    );
  });

  return (
    <main className="app">
      <Directions />
      <div
        className="matrix"
        style={{
          padding: `${scale.imgSize + 30}px 10px 20px 10px`,
        }}
      >
        <div ref={graphRef} className="matrix__graph">
          {fruit}
        </div>
      </div>
      <Bottom
        submitRatings={submitRatings}
        setShowAggregate={setShowAggregate}
        showAggregate={showAggregate}
      />
    </main>
  );
};

export default Graph;
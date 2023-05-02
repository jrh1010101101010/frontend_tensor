import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Scatter } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

//Chart.register(Chart.scale.LinearScale);

export default function Numbers() {
  const [prediction, setPrediction] = useState(null);
  const [linearModel, setLinearModel] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function trainModel() {
      const model = await tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
      model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

      const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
      const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);

      await model.fit(xs, ys, { epochs: 500 });
      setLinearModel(model);
    }
    trainModel();
  }, []);

  useEffect(() => {
    if (linearModel && prediction) {
      const xs = [-1, 0, 1, 2, 3, 4];
      const trainingData = [-3, -1, 1, 3, 5, 7];
      const predictedData = [linearModel.predict(tf.tensor2d(xs, [6, 1])).dataSync()];
      
      const chartData = {
        datasets: [
          {
            label: 'Training Data',
            data: xs.map((x, i) => ({ x, y: trainingData[i] })),
            backgroundColor: 'rgba(75,192,192,1)',
            pointRadius: 5,
          },
          {
            label: 'Model Prediction',
            data: xs.map((x, i) => ({ x, y: predictedData[0][i] })),
            backgroundColor: 'rgba(255,99,132,1)',
            pointRadius: 5,
          },
        ],
      };
      setChartData(chartData);
    }
  }, [linearModel, prediction]);

  const predict = (val) => {
    if (linearModel) {
      const input = tf.tensor2d([val], [1, 1]);
      const output = linearModel.predict(input);

      setPrediction(Array.from(output.dataSync())[0]);
    }
  };

  const handleInput = (e) => {
    const value = parseFloat(e.target.value);
    predict(value);
  };

  return (
    <main>
      <div>
        <h1>Random Num Model</h1>
        <label htmlFor="">Enter a Number</label>
        <input type="number" onChange={handleInput} />
        <h4>predicted value: {prediction}</h4>
        {chartData && (
          <Scatter
            data={chartData}
            options={{
              title: {
                display: true,
                text: 'Linear Regression Model',
              },
              scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                },
              },
            }}
          />
        )}
      </div>
    </main>
  );
}




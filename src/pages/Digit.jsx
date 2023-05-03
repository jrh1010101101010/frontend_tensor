import { useState } from 'react'

export default function Digit() {
  const [prediction, setPrediction] = useState(null)
  const [drawingData, setDrawingData]= useState(null)
  const [isCanvasCleared, setIsCanvasCleared] = useState(false);

  const handleDraw = e => {
    const canvas = e.target
    const ctx = canvas.getContext("2d")
    ctx.strokeStyle = 'lightgrey'; 
    ctx.lineWidth = 3;
    ctx.beginPath()

    

    const postion = canvas.getBoundingClientRect()
    const currentX = e.clientX - postion.left
    const currentY = e.clientY - postion.top
    ctx.moveTo(currentX, currentY)

    const handleMouseMove = e => {
      const postion = canvas.getBoundingClientRect()
      const movingX = e.clientX - postion.left
      const movingY = e.clientY - postion.top
      ctx.lineTo(movingX, movingY)
      ctx.stroke()
      setDrawingData(canvas.toDataURL())
    }

    const handleMouseUp = () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseup", handleMouseUp)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)
  }

  const handlePrediction = async () => {
    const canvas = document.getElementById('canvas')
    const dataUrl = canvas.toDataURL('image/png')
    const base64Image = dataUrl.split(',')[1]
  
    // Pass the base64 encoded image file to the Flask application for preprocessing
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: base64Image })
    })
  
    const data = await response.json()
    setPrediction(data.prediction)
  }
  
  const handleClearCanvas = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawingData(null);
    setPrediction(null);
    setIsCanvasCleared(true);
  };

  return (
    <main>
      <h1>Digits Model</h1>

      <canvas id="canvas" width="280" height="280" style={{ border: '1px solid black' }} onMouseDown={handleDraw}></canvas>
      <div className="btn">
        <button onClick={handlePrediction}>Computer Prediction</button>
        <button onClick={handleClearCanvas}>Clear Canvas</button>
      </div>
      

      {prediction && <p>the prediction digit is {prediction}</p>}

    </main>
  )
}

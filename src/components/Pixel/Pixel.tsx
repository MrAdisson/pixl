import React, { CSSProperties, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { drawMode, setBrushColor } from '../../reducers/toolsReducer';
import { Color } from '../../types/Color';

interface Props {
  color: Color;
  coordinate: { x: number; y: number };
  zoom: number;
}

const Pixel = ({ color, coordinate, zoom }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const controlMode = useAppSelector((state) => state.tools.mode);
  const brushColor = useAppSelector((state) => state.tools.brushSettings.brushColor);
  const isMouseDown = useAppSelector((state) => state.mouse.isMouseDown);
  const gridSettings = useAppSelector((state) => state.tools.gridSettings);

  const [pixelColor, setPixelColor] = useState<Color>(color);
  const mouseLeave = () => setIsHover(false);
  const dispatch = useAppDispatch();
  const borderSize = 1;
  const HOVER_COLOR = 'white';
  const draw = () => {
    setIsHover(true);
    console.log(coordinate);
    if (controlMode !== 'DRAW') return;
    if (!isMouseDown) return;
    setPixelColor(brushColor);
  };

  const handleClick = () => {
    setIsHover(true);
    console.log(coordinate);

    if (controlMode === 'EYEDROPPER') {
      dispatch(drawMode());
      dispatch(setBrushColor(pixelColor));
      return;
    }
    if (controlMode !== 'DRAW') return;
    setPixelColor(brushColor);
  };
  return (
    <div
      className='pixel'
      onMouseDown={handleClick}
      onMouseEnter={draw}
      onClick={handleClick}
      onMouseLeave={mouseLeave}
      style={{
        height: 1 * zoom,
        width: 1 * zoom,
        backgroundColor: pixelColor,
        border: `${borderSize}px solid ${
          isHover
            ? HOVER_COLOR
            : gridSettings.visible
            ? gridSettings.color
            : pixelColor
        }`,
      }}
    ></div>
  );
};

const styles = {};

export default Pixel;

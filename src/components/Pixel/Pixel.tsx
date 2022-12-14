import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateFile } from '../../reducers/fileReducer';
import { drawMode, setBrushColor } from '../../reducers/toolsReducer';
import { Color } from '../../types/Color';

interface Props {
  initialColor: Color;
  coordinate: { x: number; y: number };
  zoom: number;
}

const Pixel = ({ initialColor, coordinate, zoom }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [pixelColor, setPixelColor] = useState<Color>(initialColor);

  const controlMode = useAppSelector((state) => state.tools.mode);
  const brushColor = useAppSelector((state) => state.tools.brushSettings.brushColor);
  const isMouseDown = useAppSelector((state) => state.mouse.isMouseDown);
  const gridSettings = useAppSelector((state) => state.tools.gridSettings);

  const dispatch = useAppDispatch();

  //TODO MOVE CONST TO STATIC
  const GRID_BORDER_SIZE = 1;
  const HOVER_COLOR = 'grey';

  useEffect(() => {
    setPixelColor(initialColor);
  }, [initialColor]);

  const mouseLeave = () => setIsHover(false);

  const draw = () => {
    dispatch(updateFile({ x: coordinate.x, y: coordinate.y, color: brushColor }));
    setPixelColor(brushColor);
  };
  const onMouseEnter = () => {
    setIsHover(true);
    // console.log(coordinate);
    if (controlMode !== 'DRAW') return;
    if (!isMouseDown) return;
    draw();
  };

  const handleClick = () => {
    setIsHover(true);
    // console.log(coordinate);

    if (controlMode === 'EYEDROPPER') {
      dispatch(drawMode());
      dispatch(setBrushColor(pixelColor));
      return;
    }
    if (controlMode !== 'DRAW') return;
    draw();
  };
  return (
    <div
      className='pixel'
      onMouseDown={handleClick}
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
      onMouseLeave={mouseLeave}
      style={{
        height: 1 * zoom,
        width: 1 * zoom,
        backgroundColor: pixelColor,
        border: `${GRID_BORDER_SIZE}px solid ${
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

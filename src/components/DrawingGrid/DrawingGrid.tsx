import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Color } from '../../types/Color';
import Pixel from '../Pixel/Pixel';
import Draggable from 'react-draggable';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { initFile } from '../../reducers/fileReducer';

const DrawingGrid = ({
  height = 16,
  width = 16,
}: {
  height: number;
  width: number;
}) => {
  //MY FILE FORMAT ! :D
  //   const defaultFile =
  //     '#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000;#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000,#990000';
  //   console.log(defaultFile.split(';').map((x) => x.split(',')));

  //   const pixelArray = useRef<Color[][]>(
  //     defaultFile.split(';').map((x) => x.split(','))
  //   );

  const DEFAULT_ZOOM = 30;

  const defaultSizedArray = Array(height).fill(Array(width).fill('white'));

  const [pixelArray, setPixelArray] = useState<Color[][]>(defaultSizedArray);

  const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM);
  const tools = useAppSelector((state) => state.tools);
  const dispatch = useAppDispatch();
  const openedFile = useAppSelector((state) => state.file.openedFile);

  useEffect(() => {
    dispatch(initFile(defaultSizedArray));
  }, [dispatch]);

  useEffect(() => {
    if (!(openedFile.length > 0)) return;
    console.log('ON UPDATE LE PIXEL ARRAY');
    setPixelArray(openedFile);
  }, [openedFile]);

  console.log('re render');
  return (
    <Draggable disabled={!(tools.mode === 'GRAB')}>
      <div
        onWheel={(e) => {
          if (e.deltaY >= 0) {
            //Scroll down
            if (zoom === 1) return;
            setZoom(zoom - 1);
          } else {
            //Scroll up
            setZoom(zoom + 1);
          }
        }}
        style={styles.gridContainer as CSSProperties}
      >
        {pixelArray.map((row, rowIndex) => {
          return (
            <div
              className='row'
              style={{ display: 'flex', flexDirection: 'row' }}
              key={`Row${rowIndex}`}
            >
              {row.map((color, columnIndex) => (
                <Pixel
                  initialColor={color}
                  pixelArray={pixelArray}
                  coordinate={{ x: columnIndex, y: rowIndex }}
                  zoom={zoom}
                  key={`Pixel${rowIndex}_${columnIndex}`}
                />
              ))}
            </div>
          );
        })}
      </div>
    </Draggable>
  );
};

const styles = {
  gridContainer: {
    padding: 3,
    border: '3px solid black',
  },
};

export default DrawingGrid;

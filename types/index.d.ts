import React from 'react';
import flvJs from 'flv.js';
interface CokoFlvProps {
    url: string;
    videoEleOpt?: React.HTMLAttributes<HTMLVideoElement>;
    mediaDataSource?: flvJs.MediaDataSource;
    config?: flvJs.Config;
    diffCritical?: number;
    diffSpeedUp?: number;
    latest?: number;
    delay?: number;
    reconnectLimit?: number;
}
declare function CokoFlv({ url, videoEleOpt, mediaDataSource, config, diffCritical, diffSpeedUp, latest, delay, reconnectLimit, }: CokoFlvProps): JSX.Element;
export default CokoFlv;

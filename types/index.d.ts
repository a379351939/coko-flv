/// <reference types="react" />
interface CokoFlvProps {
    url: string;
    videoEleOpt?: object;
    mediaDataSource?: object;
    config?: object;
    diffCritical?: number;
    diffSpeedUp?: number;
    latest?: number;
    delay?: number;
}
declare function CokoFlv({ url, videoEleOpt, mediaDataSource, config, diffCritical, diffSpeedUp, latest, delay, }: CokoFlvProps): JSX.Element;
export default CokoFlv;

import { Source, SourceSettings, Syncable, Transform } from '@orbit/data';
import { Cache, CacheSettings, PatchResultData } from '@orbit/store';
import { Reducer, Dispatch } from 'redux';
export interface State {
    [keys: string]: any;
}
export declare const reducer: Reducer<State>;
export interface ReduxStore {
    dispatch: Dispatch<any>;
}
export interface StoreSettings extends SourceSettings {
    cacheSettings?: CacheSettings;
    store?: ReduxStore;
}
export default class ReduxSource extends Source implements Syncable {
    protected _store: ReduxStore;
    private _cache;
    private _transforms;
    private _transformInverses;
    sync: (transformOrTransforms: Transform | Transform[]) => Promise<void>;
    constructor(settings?: StoreSettings);
    readonly cache: Cache;
    _sync(transform: Transform): Promise<void>;
    protected _applyTransform(transform: Transform): PatchResultData[];
    private _serializeCache();
}

import Orbit, {
  KeyMap,
  Schema,
  RecordOperation,
  Source, SourceSettings,
  Syncable, syncable,
  Transform,
} from '@orbit/data'
import { Cache, CacheSettings, PatchResultData } from '@orbit/store'
import { Dict } from '@orbit/utils'
import { Action, AnyAction, Reducer, Dispatch } from 'redux'


// Actions
const SET_STATE: string = '@@orbit-redux-source/SET_STATE'
const setState = (state): AnyAction => ({ type: SET_STATE, payload: state })

// Reducer
export interface State { [keys: string]: any }

export const reducer: Reducer<State> = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_STATE:
      return payload
    default:
      return state
  }
}

// Redux Source Store
export interface ReduxStore { dispatch: Dispatch<any> }
export interface StoreSettings extends SourceSettings {
  cacheSettings?: CacheSettings
  store?: ReduxStore
}

@syncable
export default class ReduxSource extends Source implements Syncable {
  protected _store: ReduxStore
  private _cache: Cache
  private _transforms: Dict<Transform>
  private _transformInverses: Dict<RecordOperation[]>

  // Syncable interface stubs
  sync: (transformOrTransforms: Transform | Transform[]) => Promise<void>

  constructor(settings: StoreSettings = {}) {
    let keyMap: KeyMap = settings.keyMap
    let schema: Schema = settings.schema
    settings.name = settings.name || 'reduxStore'

    super(settings)

    this._store = settings.store
    this._transforms = {}
    this._transformInverses = {}

    let cacheSettings: CacheSettings = settings.cacheSettings || {}
    cacheSettings.schema = schema
    cacheSettings.keyMap = keyMap
    cacheSettings.queryBuilder = cacheSettings.queryBuilder || this.queryBuilder
    cacheSettings.transformBuilder = cacheSettings.transformBuilder || this.transformBuilder
    this._cache = new Cache(cacheSettings)
  }

  get cache(): Cache {
    return this._cache;
  }

  /////////////////////////////////////////////////////////////////////////////
  // Syncable interface implementation
  /////////////////////////////////////////////////////////////////////////////

  _sync(transform: Transform): Promise<void> {
    const state = this._applyTransform(transform)
    this._store.dispatch(setState(state))
    return Orbit.Promise.resolve()
  }

  protected _applyTransform(transform: Transform): PatchResultData[] {
    const result = this.cache.patch(<RecordOperation[]>transform.operations)
    this._transforms[transform.id] = transform
    this._transformInverses[transform.id] = result.inverse
    return result.data
  }
}

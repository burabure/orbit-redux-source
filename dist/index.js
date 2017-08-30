var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Orbit, { Source, syncable, } from '@orbit/data';
import { Cache } from '@orbit/store';
// Actions
const SET_STATE = '@@orbit-redux-source/SET_STATE';
const setState = (state) => ({ type: SET_STATE, payload: state });
export const reducer = (state = {}, { type, payload }) => {
    switch (type) {
        case SET_STATE:
            return payload;
        default:
            return state;
    }
};
let ReduxSource = class ReduxSource extends Source {
    constructor(settings = {}) {
        let keyMap = settings.keyMap;
        let schema = settings.schema;
        settings.name = settings.name || 'reduxStore';
        super(settings);
        this._store = settings.store;
        this._transforms = {};
        this._transformInverses = {};
        let cacheSettings = settings.cacheSettings || {};
        cacheSettings.schema = schema;
        cacheSettings.keyMap = keyMap;
        cacheSettings.queryBuilder = cacheSettings.queryBuilder || this.queryBuilder;
        cacheSettings.transformBuilder = cacheSettings.transformBuilder || this.transformBuilder;
        this._cache = new Cache(cacheSettings);
    }
    get cache() {
        return this._cache;
    }
    /////////////////////////////////////////////////////////////////////////////
    // Syncable interface implementation
    /////////////////////////////////////////////////////////////////////////////
    _sync(transform) {
        const state = this._applyTransform(transform);
        this._store.dispatch(setState(state));
        return Orbit.Promise.resolve();
    }
    _applyTransform(transform) {
        const result = this.cache.patch(transform.operations);
        this._transforms[transform.id] = transform;
        this._transformInverses[transform.id] = result.inverse;
        return result.data;
    }
};
ReduxSource = __decorate([
    syncable
], ReduxSource);
export default ReduxSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxLQUFLLEVBQUUsRUFJWixNQUFNLEVBQ0ksUUFBUSxHQUVuQixNQUFNLGFBQWEsQ0FBQTtBQUNwQixPQUFPLEVBQUUsS0FBSyxFQUFrQyxNQUFNLGNBQWMsQ0FBQTtBQUtwRSxVQUFVO0FBQ1YsTUFBTSxTQUFTLEdBQVcsZ0NBQWdDLENBQUE7QUFDMUQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFLLEtBQWdCLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0FBSzVFLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBbUIsQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtJQUNuRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2IsS0FBSyxTQUFTO1lBQ1osTUFBTSxDQUFDLE9BQU8sQ0FBQTtRQUNoQjtZQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUE7SUFDaEIsQ0FBQztBQUNILENBQUMsQ0FBQTtBQVVELElBQXFCLFdBQVcsR0FBaEMsaUJBQWlDLFNBQVEsTUFBTTtJQVM3QyxZQUFZLFdBQTBCLEVBQUU7UUFDdEMsSUFBSSxNQUFNLEdBQVcsUUFBUSxDQUFDLE1BQU0sQ0FBQTtRQUNwQyxJQUFJLE1BQU0sR0FBVyxRQUFRLENBQUMsTUFBTSxDQUFBO1FBQ3BDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxZQUFZLENBQUE7UUFFN0MsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBRWYsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFBO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUE7UUFFNUIsSUFBSSxhQUFhLEdBQWtCLFFBQVEsQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFBO1FBQy9ELGFBQWEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQzdCLGFBQWEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQzdCLGFBQWEsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFBO1FBQzVFLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFBO1FBQ3hGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCw2RUFBNkU7SUFDN0Usb0NBQW9DO0lBQ3BDLDZFQUE2RTtJQUU3RSxLQUFLLENBQUMsU0FBb0I7UUFDeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUNyQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNoQyxDQUFDO0lBRVMsZUFBZSxDQUFDLFNBQW9CO1FBQzVDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFvQixTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDeEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFBO1FBQzFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQTtRQUN0RCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNwQixDQUFDO0NBQ0YsQ0FBQTtBQWhEb0IsV0FBVztJQUQvQixRQUFRO0dBQ1ksV0FBVyxDQWdEL0I7ZUFoRG9CLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT3JiaXQsIHtcbiAgS2V5TWFwLFxuICBTY2hlbWEsXG4gIFJlY29yZE9wZXJhdGlvbixcbiAgU291cmNlLCBTb3VyY2VTZXR0aW5ncyxcbiAgU3luY2FibGUsIHN5bmNhYmxlLFxuICBUcmFuc2Zvcm0sXG59IGZyb20gJ0BvcmJpdC9kYXRhJ1xuaW1wb3J0IHsgQ2FjaGUsIENhY2hlU2V0dGluZ3MsIFBhdGNoUmVzdWx0RGF0YSB9IGZyb20gJ0BvcmJpdC9zdG9yZSdcbmltcG9ydCB7IERpY3QgfSBmcm9tICdAb3JiaXQvdXRpbHMnXG5pbXBvcnQgeyBBY3Rpb24sIEFueUFjdGlvbiwgUmVkdWNlciwgRGlzcGF0Y2ggfSBmcm9tICdyZWR1eCdcblxuXG4vLyBBY3Rpb25zXG5jb25zdCBTRVRfU1RBVEU6IHN0cmluZyA9ICdAQG9yYml0LXJlZHV4LXNvdXJjZS9TRVRfU1RBVEUnXG5jb25zdCBzZXRTdGF0ZSA9IChzdGF0ZSk6IEFueUFjdGlvbiA9PiAoeyB0eXBlOiBTRVRfU1RBVEUsIHBheWxvYWQ6IHN0YXRlIH0pXG5cbi8vIFJlZHVjZXJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUgeyBba2V5czogc3RyaW5nXTogYW55IH1cblxuZXhwb3J0IGNvbnN0IHJlZHVjZXI6IFJlZHVjZXI8U3RhdGU+ID0gKHN0YXRlID0ge30sIHsgdHlwZSwgcGF5bG9hZCB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgU0VUX1NUQVRFOlxuICAgICAgcmV0dXJuIHBheWxvYWRcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLy8gUmVkdXggU291cmNlIFN0b3JlXG5leHBvcnQgaW50ZXJmYWNlIFJlZHV4U3RvcmUgeyBkaXNwYXRjaDogRGlzcGF0Y2g8YW55PiB9XG5leHBvcnQgaW50ZXJmYWNlIFN0b3JlU2V0dGluZ3MgZXh0ZW5kcyBTb3VyY2VTZXR0aW5ncyB7XG4gIGNhY2hlU2V0dGluZ3M/OiBDYWNoZVNldHRpbmdzXG4gIHN0b3JlPzogUmVkdXhTdG9yZVxufVxuXG5Ac3luY2FibGVcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZHV4U291cmNlIGV4dGVuZHMgU291cmNlIGltcGxlbWVudHMgU3luY2FibGUge1xuICBwcm90ZWN0ZWQgX3N0b3JlOiBSZWR1eFN0b3JlXG4gIHByaXZhdGUgX2NhY2hlOiBDYWNoZVxuICBwcml2YXRlIF90cmFuc2Zvcm1zOiBEaWN0PFRyYW5zZm9ybT5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtSW52ZXJzZXM6IERpY3Q8UmVjb3JkT3BlcmF0aW9uW10+XG5cbiAgLy8gU3luY2FibGUgaW50ZXJmYWNlIHN0dWJzXG4gIHN5bmM6ICh0cmFuc2Zvcm1PclRyYW5zZm9ybXM6IFRyYW5zZm9ybSB8IFRyYW5zZm9ybVtdKSA9PiBQcm9taXNlPHZvaWQ+XG5cbiAgY29uc3RydWN0b3Ioc2V0dGluZ3M6IFN0b3JlU2V0dGluZ3MgPSB7fSkge1xuICAgIGxldCBrZXlNYXA6IEtleU1hcCA9IHNldHRpbmdzLmtleU1hcFxuICAgIGxldCBzY2hlbWE6IFNjaGVtYSA9IHNldHRpbmdzLnNjaGVtYVxuICAgIHNldHRpbmdzLm5hbWUgPSBzZXR0aW5ncy5uYW1lIHx8ICdyZWR1eFN0b3JlJ1xuXG4gICAgc3VwZXIoc2V0dGluZ3MpXG5cbiAgICB0aGlzLl9zdG9yZSA9IHNldHRpbmdzLnN0b3JlXG4gICAgdGhpcy5fdHJhbnNmb3JtcyA9IHt9XG4gICAgdGhpcy5fdHJhbnNmb3JtSW52ZXJzZXMgPSB7fVxuXG4gICAgbGV0IGNhY2hlU2V0dGluZ3M6IENhY2hlU2V0dGluZ3MgPSBzZXR0aW5ncy5jYWNoZVNldHRpbmdzIHx8IHt9XG4gICAgY2FjaGVTZXR0aW5ncy5zY2hlbWEgPSBzY2hlbWFcbiAgICBjYWNoZVNldHRpbmdzLmtleU1hcCA9IGtleU1hcFxuICAgIGNhY2hlU2V0dGluZ3MucXVlcnlCdWlsZGVyID0gY2FjaGVTZXR0aW5ncy5xdWVyeUJ1aWxkZXIgfHwgdGhpcy5xdWVyeUJ1aWxkZXJcbiAgICBjYWNoZVNldHRpbmdzLnRyYW5zZm9ybUJ1aWxkZXIgPSBjYWNoZVNldHRpbmdzLnRyYW5zZm9ybUJ1aWxkZXIgfHwgdGhpcy50cmFuc2Zvcm1CdWlsZGVyXG4gICAgdGhpcy5fY2FjaGUgPSBuZXcgQ2FjaGUoY2FjaGVTZXR0aW5ncylcbiAgfVxuXG4gIGdldCBjYWNoZSgpOiBDYWNoZSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlO1xuICB9XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8gU3luY2FibGUgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgX3N5bmModHJhbnNmb3JtOiBUcmFuc2Zvcm0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX2FwcGx5VHJhbnNmb3JtKHRyYW5zZm9ybSlcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChzZXRTdGF0ZShzdGF0ZSkpXG4gICAgcmV0dXJuIE9yYml0LlByb21pc2UucmVzb2x2ZSgpXG4gIH1cblxuICBwcm90ZWN0ZWQgX2FwcGx5VHJhbnNmb3JtKHRyYW5zZm9ybTogVHJhbnNmb3JtKTogUGF0Y2hSZXN1bHREYXRhW10ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2FjaGUucGF0Y2goPFJlY29yZE9wZXJhdGlvbltdPnRyYW5zZm9ybS5vcGVyYXRpb25zKVxuICAgIHRoaXMuX3RyYW5zZm9ybXNbdHJhbnNmb3JtLmlkXSA9IHRyYW5zZm9ybVxuICAgIHRoaXMuX3RyYW5zZm9ybUludmVyc2VzW3RyYW5zZm9ybS5pZF0gPSByZXN1bHQuaW52ZXJzZVxuICAgIHJldHVybiByZXN1bHQuZGF0YVxuICB9XG59XG4iXX0=
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
        this._applyTransform(transform);
        this._store.dispatch(setState(this._serializeCache()));
        return Orbit.Promise.resolve();
    }
    _applyTransform(transform) {
        const result = this.cache.patch(transform.operations);
        this._transforms[transform.id] = transform;
        this._transformInverses[transform.id] = result.inverse;
        return result.data;
    }
    _serializeCache() {
        return Object.keys(this.schema.models).reduce((serializedData, type) => (Object.assign({}, serializedData, { [type]: Array.from(this._cache.records(type).values()) })), {});
    }
};
ReduxSource = __decorate([
    syncable
], ReduxSource);
export default ReduxSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxLQUFLLEVBQUUsRUFJWixNQUFNLEVBR04sUUFBUSxHQUVULE1BQU0sYUFBYSxDQUFBO0FBQ3BCLE9BQU8sRUFBRSxLQUFLLEVBQWtDLE1BQU0sY0FBYyxDQUFBO0FBSXBFLFVBQVU7QUFDVixNQUFNLFNBQVMsR0FBVyxnQ0FBZ0MsQ0FBQTtBQUMxRCxNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQUssS0FBZ0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7QUFPNUUsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFtQixDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0lBQ25FLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDYixLQUFLLFNBQVM7WUFDWixNQUFNLENBQUMsT0FBTyxDQUFBO1FBQ2hCO1lBQ0UsTUFBTSxDQUFDLEtBQUssQ0FBQTtJQUNoQixDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBWUQsSUFBcUIsV0FBVyxHQUFoQyxpQkFBaUMsU0FBUSxNQUFNO0lBUzdDLFlBQVksV0FBMEIsRUFBRTtRQUN0QyxJQUFJLE1BQU0sR0FBVyxRQUFRLENBQUMsTUFBTSxDQUFBO1FBQ3BDLElBQUksTUFBTSxHQUFXLFFBQVEsQ0FBQyxNQUFNLENBQUE7UUFDcEMsUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLFlBQVksQ0FBQTtRQUU3QyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFZixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUE7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUE7UUFDckIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQTtRQUU1QixJQUFJLGFBQWEsR0FBa0IsUUFBUSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUE7UUFDL0QsYUFBYSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDN0IsYUFBYSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDN0IsYUFBYSxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUE7UUFDNUUsYUFBYSxDQUFDLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUE7UUFDeEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDcEIsQ0FBQztJQUVELDZFQUE2RTtJQUM3RSxvQ0FBb0M7SUFDcEMsNkVBQTZFO0lBRTdFLEtBQUssQ0FBQyxTQUFvQjtRQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3RELE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2hDLENBQUM7SUFFUyxlQUFlLENBQUMsU0FBb0I7UUFDNUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQW9CLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUN4RSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUE7UUFDMUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFBO1FBQ3RELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ3BCLENBQUM7SUFFTyxlQUFlO1FBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUMzQyxDQUFDLGNBQWMsRUFBRSxJQUFJLEtBQUssbUJBQ3JCLGNBQWMsSUFDakIsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQ3RELEVBQ0YsRUFBRSxDQUNILENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQTFEb0IsV0FBVztJQUQvQixRQUFRO0dBQ1ksV0FBVyxDQTBEL0I7ZUExRG9CLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT3JiaXQsIHtcbiAgS2V5TWFwLFxuICBTY2hlbWEsXG4gIFJlY29yZE9wZXJhdGlvbixcbiAgU291cmNlLFxuICBTb3VyY2VTZXR0aW5ncyxcbiAgU3luY2FibGUsXG4gIHN5bmNhYmxlLFxuICBUcmFuc2Zvcm0sXG59IGZyb20gJ0BvcmJpdC9kYXRhJ1xuaW1wb3J0IHsgQ2FjaGUsIENhY2hlU2V0dGluZ3MsIFBhdGNoUmVzdWx0RGF0YSB9IGZyb20gJ0BvcmJpdC9zdG9yZSdcbmltcG9ydCB7IERpY3QgfSBmcm9tICdAb3JiaXQvdXRpbHMnXG5pbXBvcnQgeyBBY3Rpb24sIEFueUFjdGlvbiwgUmVkdWNlciwgRGlzcGF0Y2ggfSBmcm9tICdyZWR1eCdcblxuLy8gQWN0aW9uc1xuY29uc3QgU0VUX1NUQVRFOiBzdHJpbmcgPSAnQEBvcmJpdC1yZWR1eC1zb3VyY2UvU0VUX1NUQVRFJ1xuY29uc3Qgc2V0U3RhdGUgPSAoc3RhdGUpOiBBbnlBY3Rpb24gPT4gKHsgdHlwZTogU0VUX1NUQVRFLCBwYXlsb2FkOiBzdGF0ZSB9KVxuXG4vLyBSZWR1Y2VyXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgW2tleXM6IHN0cmluZ106IGFueVxufVxuXG5leHBvcnQgY29uc3QgcmVkdWNlcjogUmVkdWNlcjxTdGF0ZT4gPSAoc3RhdGUgPSB7fSwgeyB0eXBlLCBwYXlsb2FkIH0pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBTRVRfU1RBVEU6XG4gICAgICByZXR1cm4gcGF5bG9hZFxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vLyBSZWR1eCBTb3VyY2UgU3RvcmVcbmV4cG9ydCBpbnRlcmZhY2UgUmVkdXhTdG9yZSB7XG4gIGRpc3BhdGNoOiBEaXNwYXRjaDxhbnk+XG59XG5leHBvcnQgaW50ZXJmYWNlIFN0b3JlU2V0dGluZ3MgZXh0ZW5kcyBTb3VyY2VTZXR0aW5ncyB7XG4gIGNhY2hlU2V0dGluZ3M/OiBDYWNoZVNldHRpbmdzXG4gIHN0b3JlPzogUmVkdXhTdG9yZVxufVxuXG5Ac3luY2FibGVcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZHV4U291cmNlIGV4dGVuZHMgU291cmNlIGltcGxlbWVudHMgU3luY2FibGUge1xuICBwcm90ZWN0ZWQgX3N0b3JlOiBSZWR1eFN0b3JlXG4gIHByaXZhdGUgX2NhY2hlOiBDYWNoZVxuICBwcml2YXRlIF90cmFuc2Zvcm1zOiBEaWN0PFRyYW5zZm9ybT5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtSW52ZXJzZXM6IERpY3Q8UmVjb3JkT3BlcmF0aW9uW10+XG5cbiAgLy8gU3luY2FibGUgaW50ZXJmYWNlIHN0dWJzXG4gIHN5bmM6ICh0cmFuc2Zvcm1PclRyYW5zZm9ybXM6IFRyYW5zZm9ybSB8IFRyYW5zZm9ybVtdKSA9PiBQcm9taXNlPHZvaWQ+XG5cbiAgY29uc3RydWN0b3Ioc2V0dGluZ3M6IFN0b3JlU2V0dGluZ3MgPSB7fSkge1xuICAgIGxldCBrZXlNYXA6IEtleU1hcCA9IHNldHRpbmdzLmtleU1hcFxuICAgIGxldCBzY2hlbWE6IFNjaGVtYSA9IHNldHRpbmdzLnNjaGVtYVxuICAgIHNldHRpbmdzLm5hbWUgPSBzZXR0aW5ncy5uYW1lIHx8ICdyZWR1eFN0b3JlJ1xuXG4gICAgc3VwZXIoc2V0dGluZ3MpXG5cbiAgICB0aGlzLl9zdG9yZSA9IHNldHRpbmdzLnN0b3JlXG4gICAgdGhpcy5fdHJhbnNmb3JtcyA9IHt9XG4gICAgdGhpcy5fdHJhbnNmb3JtSW52ZXJzZXMgPSB7fVxuXG4gICAgbGV0IGNhY2hlU2V0dGluZ3M6IENhY2hlU2V0dGluZ3MgPSBzZXR0aW5ncy5jYWNoZVNldHRpbmdzIHx8IHt9XG4gICAgY2FjaGVTZXR0aW5ncy5zY2hlbWEgPSBzY2hlbWFcbiAgICBjYWNoZVNldHRpbmdzLmtleU1hcCA9IGtleU1hcFxuICAgIGNhY2hlU2V0dGluZ3MucXVlcnlCdWlsZGVyID0gY2FjaGVTZXR0aW5ncy5xdWVyeUJ1aWxkZXIgfHwgdGhpcy5xdWVyeUJ1aWxkZXJcbiAgICBjYWNoZVNldHRpbmdzLnRyYW5zZm9ybUJ1aWxkZXIgPSBjYWNoZVNldHRpbmdzLnRyYW5zZm9ybUJ1aWxkZXIgfHwgdGhpcy50cmFuc2Zvcm1CdWlsZGVyXG4gICAgdGhpcy5fY2FjaGUgPSBuZXcgQ2FjaGUoY2FjaGVTZXR0aW5ncylcbiAgfVxuXG4gIGdldCBjYWNoZSgpOiBDYWNoZSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlXG4gIH1cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLyBTeW5jYWJsZSBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb25cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICBfc3luYyh0cmFuc2Zvcm06IFRyYW5zZm9ybSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX2FwcGx5VHJhbnNmb3JtKHRyYW5zZm9ybSlcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChzZXRTdGF0ZSh0aGlzLl9zZXJpYWxpemVDYWNoZSgpKSlcbiAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKClcbiAgfVxuXG4gIHByb3RlY3RlZCBfYXBwbHlUcmFuc2Zvcm0odHJhbnNmb3JtOiBUcmFuc2Zvcm0pOiBQYXRjaFJlc3VsdERhdGFbXSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jYWNoZS5wYXRjaCg8UmVjb3JkT3BlcmF0aW9uW10+dHJhbnNmb3JtLm9wZXJhdGlvbnMpXG4gICAgdGhpcy5fdHJhbnNmb3Jtc1t0cmFuc2Zvcm0uaWRdID0gdHJhbnNmb3JtXG4gICAgdGhpcy5fdHJhbnNmb3JtSW52ZXJzZXNbdHJhbnNmb3JtLmlkXSA9IHJlc3VsdC5pbnZlcnNlXG4gICAgcmV0dXJuIHJlc3VsdC5kYXRhXG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVDYWNoZSgpOiBTdGF0ZSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuc2NoZW1hLm1vZGVscykucmVkdWNlKFxuICAgICAgKHNlcmlhbGl6ZWREYXRhLCB0eXBlKSA9PiAoe1xuICAgICAgICAuLi5zZXJpYWxpemVkRGF0YSxcbiAgICAgICAgW3R5cGVdOiBBcnJheS5mcm9tKHRoaXMuX2NhY2hlLnJlY29yZHModHlwZSkudmFsdWVzKCkpLFxuICAgICAgfSksXG4gICAgICB7fSxcbiAgICApXG4gIH1cbn1cbiJdfQ==
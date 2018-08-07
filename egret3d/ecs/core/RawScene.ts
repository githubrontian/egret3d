namespace paper {
    /**
     * 
     */
    export class BaseObjectAsset extends Asset {
        protected _raw: ISerializedData = null as any;
        /**
         * @internal
         */
        $parse(json: ISerializedData) {
            this._raw = json;
        }

        public dispose() {
            if (this._isBuiltin) {
                return;
            }

            this._raw = null as any;
        }

        public caclByteLength() {
            return 0;
        }
    }

    /**
     * scene asset
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 场景数据资源
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    export class RawScene extends BaseObjectAsset {
        /**
         * @internal
         */
        public createInstance(keepUUID: boolean = false) {
            if (!this._raw) {
                return null;
            }

            const isEditor = Application.isEditor && !Application.isPlaying;
            const deserializer = new paper.Deserializer();
            const scene = deserializer.deserialize(this._raw, keepUUID) as Scene | null;

            if (scene && isEditor) {
                scene.extras!.rawScene = this;
            }

            return scene;
        }
    }
}
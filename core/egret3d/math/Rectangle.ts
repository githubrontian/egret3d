namespace egret3d {
    /**
     * 
     */
    export interface ISize {
        w: number;
        h: number;
    }
    /**
     * 
     */
    export interface IRectangle extends IVector2, ISize {
    }
    /**
     * 矩形可序列化对象
     */
    export class Rectangle extends paper.BaseRelease<AABB> implements IRectangle, paper.ICCS<Rectangle>, paper.ISerializable {
        private static readonly _instances: Rectangle[] = [];
        /**
         * 创建一个矩形。
         * @param x X 轴分量。
         * @param y Y 轴分量。
         * @param w 宽。
         * @param h 高。
         */
        public static create(x: number = 0.0, y: number = 0.0, w: number = 0.0, h: number = 0.0) {
            if (this._instances.length > 0) {
                const instance = this._instances.pop()!.set(x, y, w, h);
                instance._released = false;
                return instance;
            }

            return new Rectangle().set(x, y, w, h);
        }
        public x: number;
        public y: number;
        public w: number;
        public h: number;

        public constructor(x: number = 0.0, y: number = 0.0, w: number = 0.0, h: number = 0.0) {
            super();
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }

        public copy(value: Readonly<IRectangle>) {
            return this.set(value.x, value.y, value.w, value.h);
        }

        public clone() {
            return Rectangle.create(this.x, this.y, this.w, this.h);
        }

        public set(x: number, y: number, w: number, h: number) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

            return this;
        }

        public serialize() {
            return [this.x, this.y, this.w, this.h];
        }

        public deserialize(element: number[]) {
            this.x = element[0];
            this.y = element[1];
            this.w = element[2];
            this.h = element[3];

            return this;
        }
    }
}
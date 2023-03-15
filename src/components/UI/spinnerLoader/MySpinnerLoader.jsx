import { DotLoader } from 'react-spinners';
import "./mySpinnerLoader.scss"
export const MySpinnerLoader = ({ loading }) => {
    return (
        <div className="spinner-loader">
            <DotLoader color="#36d7b7" loading={loading} cssOverride={{
                position: 'absolute',
                marginTop: "285px"
            }} />
        </div>
    )
}
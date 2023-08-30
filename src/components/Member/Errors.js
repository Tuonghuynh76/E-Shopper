import ('./Error.css')
function Errors(props) {
    function renderErr() {
        let {errors} = props;
        if (Object.keys(errors).length > 0) {
            return Object.keys(errors).map((key, index) => {
                return (
                    <li className='Errors' key={index}>{errors[key]}</li>
                );
            });
        }
    }
    return (
        <div>
            {renderErr()}
        </div>
    )
}
export default Errors;
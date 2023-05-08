import { FaTrash, FaEdit, FaLevelUpAlt, FaLevelDownAlt } from "react-icons/fa";
function FormPreview(props) {
    var field = props.field, index = props.index, formFields = props.formFields, handleMoveDown = props.handleMoveDown, handleMoveUp = props.handleMoveUp;
    var handleRemoveField = props.handleRemoveField, handleEditField = props.handleEditField;
    return(
        <div className='form-group mb-2' key={field.id}>
            <label>{field.label}</label>
            <div className="input-group mb-3">
                <input name={field.name} className={field.className} type={field.type} />
                <div className='input-group-append'>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button className='btn-mouve-up' onClick={(e) => handleMoveUp(index, e)} disabled={index === 0}><FaLevelUpAlt /></button>
                        <button className='btn-mouve-down' onClick={(e) => handleMoveDown(index, e)} disabled={index === formFields.length - 1}><FaLevelDownAlt /></button>
                        <button className='btn-remove-elt delete' onClick={() => handleRemoveField(field.id)}><FaTrash /></button>
                        <button className='btn-edit-elt edit ' onClick={(e) => handleEditField(index, field.id, e)}><FaEdit /></button>
                    </div>
                </div>
            </div>
            {field.type === 'select' && (
                <select className='form-control'>
                    {field.className.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

            )}
        </div>
)
}
export default FormPreview
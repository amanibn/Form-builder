function FormHtml(props){
    return(
    <div className='col-md-6 col-sm-12 col-xs-12'>
        {props.formFields.length > 0 && (
            <div>
                <button className='copy-text m-1' onClick={props.copyToClipboard}>Copy</button>
                <button className='export-json m-1' onClick={() => props.exportAsJson(props.formFields)}>Export as JSON</button>
            </div>
        )}
        <pre id='copiable-text'>{props.generateFormHTML()}</pre>
    </div>
    )
}
export default FormHtml
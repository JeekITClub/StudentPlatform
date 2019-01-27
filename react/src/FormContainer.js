import React, {Component} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    handleChange(value) {
        this.setState({text: value})
    }

    render() {
        const modules = {
            toolbar: [
                [{'header': [1, 2, 3, 4, 5, false]}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
            ],
        };

        const formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ];

        return (
            <ReactQuill value={this.state.text} modules={modules} formats={formats}
                        onChange={(value) => this.handleChange(value)}/>
        )
    }
}

export default FormContainer;
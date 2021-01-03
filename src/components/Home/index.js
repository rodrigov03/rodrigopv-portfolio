import { Component } from 'react';
import { Container, Form } from 'react-bootstrap';
import { DoubleArrow } from '@material-ui/icons';
import { TextField, Button } from '@material-ui/core';
import emailjs from 'emailjs-com';
import Footer from '../Footer'  
    class Home extends Component {
        constructor(props) {
            super(props);
            this.state = { 
                formHasError: false,
                rightSide: false,
                formvalues: {
                    name: '',
                    replay_to: '',
                    subject: '',
                    message: ''
                },
                formvalidate:{
                    name: ['', false],
                    replay_to: ['', false],
                    subject: ['', false],
                    message: ['', false]
                }
            };
            this.toggleForm = this.toggleForm.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleValidation = this.handleValidation.bind(this);
            
        }

        handleValidation = (e) => {
            let fields = this.state.formvalues;
            let errors = this.state.formvalidate;
            let formIsValid = true;

            //Name
            if(!fields["name"]){
                formIsValid = false;
                errors["name"] = ["Cannot be empty", true];
            }else{
                errors["name"] = ["", false];
            }
      
            if(typeof fields["name"] !== "undefined"){
                if(!fields["name"].match(/^[a-zA-Z]+$/)){
                    formIsValid = false;
                    errors["name"] = ["Only letters", true];
                }        
            }else{
                errors["name"] = ["", false];
            }
       
            //Email
            if(!fields["replay_to"]){
                formIsValid = false;
                errors["replay_to"] = ["Cannot be empty", true];
            }else{
                errors["replay_to"] = ["", false];
            }
      
            if(typeof fields["replay_to"] !== "undefined"){
                let lastAtPos = fields["replay_to"].lastIndexOf('@');
                let lastDotPos = fields["replay_to"].lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["replay_to"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["replay_to"].length - lastDotPos) > 2)) {
                    formIsValid = false;
                    errors["replay_to"] = ["Email is not valid", true];
                }else{
                    errors["replay_to"] = ["", false];
                }
            }  

            if(!fields["subject"]){
                formIsValid = false;
                errors["subject"] = ["Cannot be empty", true];
            }else{
                errors["subject"] = ["", false];
            }

            if(!fields["message"]){
                formIsValid = false;
                errors["message"] = ["Cannot be empty", true];
            }else{
                errors["message"] = ["", false];
            }

            this.setState({errors});
            return formIsValid;
        }   
        toggleForm(){
            this.setState({
                rightSide: !this.state.rightSide
            })
            console.log('toogle');
            document.querySelector('.homebg').classList.toggle('minimize-left')
            document.querySelector('.contactForm-Wrapper').classList.toggle('hide-right')
        }
        handleChange(e){
            let tempvalues = this.state.formvalues
            tempvalues[e.target.getAttribute("name")] = e.target.value
            this.setState({tempvalues})
        }
        sendEmail = (e) => {
            e.preventDefault();
alert('e');
            const validade = this.handleValidation()
            console.log(e)
            console.log(validade)
            if(validade){
                this.setState({formHasError: false})
                emailjs.sendForm('service_f57rnog', 'template_36ctgng', e.target, 'user_A8TUKoV7JzmuTJsyAaeac')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
                    e.target.reset()
            }else{
                console.log(this.state.formvalidate)
                this.setState({formHasError: true})
                alert("Form has errors.")
            }
            
        }
        render() {
        return (
            <>
                <Container fluid className="homebg p-0">
                    <Container className="homeCont"> 
                    {/*<SideNav/>*/}
                        <div className="homeCont_wrapper">
                            <h1>Hey there, I'm Rodrigo.</h1> 
                            <h3>Front End Developer / Web Developer / Self-Taught Dev</h3>
                            <div className="homeCont_descr">
                                <p className="homeCont_descr__highlight">I create engaging and pixel perfect websites.</p>
                                <p className="homeCont_descr__contact">My portfolio is currently under construction 🚧<br/>however, don't hesitate to contact me <span className="btnToggForm" onClick={this.toggleForm}>here <DoubleArrow/></span></p>
                            </div>
                        </div>
                    </Container>
                    <Footer/>
                </Container>
                {this.state.rightSide && (
                    <div className="close-right-side" onClick={this.toggleForm}></div>
                )}
                <div className="contactForm-Wrapper hide-right">
                    <div className="contactForm-Inner">
                        <form className='form' noValidate autoComplete="off" onSubmit={this.sendEmail}>
                            <Form.Group>
                                <TextField name="name" label="Name" onChange={this.handleChange} variant="filled" error={this.state.formvalidate.name[1]} value={this.state.formvalues.name} helperText={this.state.formvalidate.name} required/>
                                <TextField name="replay_to" label="Email" onChange={this.handleChange} variant="filled" error={this.state.formvalidate.replay_to[1]} value={this.state.formvalues.replay_to} helperText={this.state.formvalidate.replay_to} required/>
                            </Form.Group>
                            <Form.Group>
                                <TextField name="subject" label="Subject" onChange={this.handleChange} variant="filled" error={this.state.formvalidate.subject[1]} value={this.state.formvalues.subject} helperText={this.state.formvalidate.subject} required/>
                            </Form.Group>
                            <Form.Group>
                                <TextField name="message" multiline rows={8} label="Message" onChange={this.handleChange} error={this.state.formvalidate.message[1]} variant="filled" value={this.state.formvalues.message} helperText={this.state.formvalidate.message} required/>
                            </Form.Group>
                            <Form.Group>
                                <Button type="submit" variant="contained">Send</Button>
                            </Form.Group>
                        </form>
                    </div>
                </div>
            </>
            
        )
    }
}
export default Home;
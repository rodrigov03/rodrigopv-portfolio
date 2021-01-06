import { Component } from 'react';
import { Container, Form } from 'react-bootstrap';
import { DoubleArrow, Close } from '@material-ui/icons';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import emailjs from 'emailjs-com';
import Footer from '../Footer'  
    class Home extends Component {
        constructor(props) {
            super(props);
            this.state = { 
                rightSide: false,
                formHasError: false,
                formloading: false,
                formoutput: '',
                sendResult: '',
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
            window.addEventListener('resize', this.handleResize)
            
        }
        
        clearFields(){
            this.setState({
                formvalues: {
                    name: '',
                    replay_to: '',
                    subject: '',
                    message: ''
                },
                formoutput: '',
                sendResult: '',
                formvalidate:{
                    name: ['', false],
                    replay_to: ['', false],
                    subject: ['', false],
                    message: ['', false]
                }
            })
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
                if(!fields["name"].match(/^[a-zA-Z\s]*$/)){
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

            //subject
            if(!fields["subject"]){
                formIsValid = false;
                errors["subject"] = ["Cannot be empty", true];
            }else{
                errors["subject"] = ["", false];
            }

            //message                
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
            this.clearFields()
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
            console.log(e.target)
            let output
            const validade = this.handleValidation()
            if(validade){
                this.setState({formHasError: false, formloading: !this.state.formloading})
                emailjs.sendForm('service_f57rnog', 'template_36ctgng', e.target, 'user_A8TUKoV7JzmuTJsyAaeac')
                .then((result) => {
                    setTimeout(() => {              
                        this.clearFields()
                        output = <p>Thank you for your kind attention. I will anwswer shortly.</p>;
                        this.setState({ 
                            formloading: false, 
                            formoutput: output, 
                            sendResult: true,
                        });
                    }, 1500);
                }, (error) => {
                    setTimeout(() => {              
                        output = <p>I'm sorry something went wrong. Try and reach out to me through email <a href="mailto:geral@rodrigopv.com">geral@rodrigopv.com</a></p>;
                        this.setState({ 
                            formloading: false, 
                            formoutput: output, 
                            sendResult: false 
                        });
                    }, 1500);
                });
                
            }else{
                console.log(this.state.formvalidate)
                this.setState({formHasError: true})
                //alert("Form has errors.")
            }
        }
        handleResize = () => {
            this.setState({
                windowHeight: window.innerHeight
            })
        }
        componentDidMount(){
            this.setState({
                windowHeight: window.innerHeight
            })
            console.log(window.innerHeight);
        }
        render() {
        return (
            <>
                <Container fluid className="homebg p-0" style={{height: this.state.windowHeight + 'px'}}>
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
                    <Close className="d-block d-md-none closeContact" onClick={this.toggleForm}/>
                    <div className="contactForm-Inner" style={{height: this.state.windowHeight + 'px'}}>
                        <form className='contactForm' noValidate autoComplete="off" onSubmit={this.sendEmail}>
                            <Form.Group>
                                <TextField className="mr-2" name="name" label="Name" onChange={this.handleChange} variant="filled" error={this.state.formvalidate.name[1]} value={this.state.formvalues.name} helperText={this.state.formvalidate.name[0]} required/>
                                <TextField className="ml-2" name="replay_to" label="Email" onChange={this.handleChange} variant="filled" error={this.state.formvalidate.replay_to[1]} value={this.state.formvalues.replay_to} helperText={this.state.formvalidate.replay_to[0]} required/>
                            </Form.Group>
                            <Form.Group>
                                <TextField name="subject" label="Subject" onChange={this.handleChange} variant="filled" error={this.state.formvalidate.subject[1]} value={this.state.formvalues.subject} helperText={this.state.formvalidate.subject[0]} required/>
                            </Form.Group>
                            <Form.Group>
                                <TextField name="message" multiline rows={8} label="Message" onChange={this.handleChange} error={this.state.formvalidate.message[1]} variant="filled" value={this.state.formvalues.message} helperText={this.state.formvalidate.message[0]} required/>
                            </Form.Group>
                            <Form.Group className="formSubmit">
                                {this.state.formloading  ? <CircularProgress color="inherit" /> : <Button type="submit" variant="contained">Send</Button>}
                            </Form.Group>
                            {this.state.formoutput &&
                                <Form.Group className={'contactForm-Result ' + (this.state.sendResult ? "contactForm-Result__success" : "contactForm-Result__error")}>
                                    {this.state.formoutput}
                                </Form.Group>
                            }
                        </form>
                    </div>
                </div>
            </>
            
        )
    }
}
export default Home;
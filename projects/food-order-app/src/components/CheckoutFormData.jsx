import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input";
import ModalContext from "../util/ModalContext.jsx";
import CartContext from "../util/CartContext.jsx";
import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";
import { useContext } from "react";
import useHttp from "../hooks/useHttp.js";
import Error from "./UI/Error.jsx";
import { useActionState } from "react";

const req = {
    method: 'POST',
    header: {
        'Content-type': 'application/json'
    }
}
export default function CheckoutFormData() {
    const modalCtx = useContext(ModalContext);
    const cartCtx = useContext(CartContext);
    const totalValue = cartCtx.items.reduce((acc, current) => {return acc + (+current.price) * current.quantity}, 0).toFixed(2)
    const { data, loading, error, sendData: sendReq } = useHttp('http://localhost:3000/orders', req);

    async function handleFormAction(prevState, fx) {
        // event.preventDefault();
        // const fx = new FormData(event.target);
        const entries = Object.fromEntries(fx.entries());
        //use http hook call api
        await sendReq(
            JSON.stringify({
                order: {
                    customer: entries,
                    items: cartCtx.items
                }
            })
        );
        
    }
    const [formState, formAction, isPending] = useActionState(handleFormAction, null);

    function handleClose()  {
         modalCtx.onHideCheckout;
    }
    let actions = (
        <>
            <Button onClick={handleClose} isText>Close</Button>
            <Button>Submit Order</Button>
        </>
    )

    if(isPending) {
        actions = <span>Sending Data.....</span>
    }

    if(data && !error) {
        return (
            <Modal open={modalCtx.value === 'checkout'} onClose={handleClose}>
                <h2>Success</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will get back to you with more details via email within next few mins.</p>
                <p className="modal-actions">
                    <Button onClick={handleClose}>Okey</Button>
                </p>
            </Modal>
        )
    }
    
    return (
        <Modal open={modalCtx.value === 'checkout'} onClose={handleClose}>
            <form action={formAction}>
                <h2>Chekout</h2>
                <p>Total amount {currencyFormatter.format(totalValue)}</p>
                <Input type="text" label="Full Name" id="name" name="name" />
                <Input type="text" label="Email Address" id="email" name="email" />
                <Input type="text" label="Street" id="street" name="street" />
                
                <div className="control-row">
                    <Input type="text" label="Postal code" id="postal-code" name="postal-code" />
                    <Input type="text" label="City" id="city" name="city" />
                </div>
                <p className="modal-actions">{actions}</p>
                <p>{error && <Error label="Failed to checkout" message={error} />}</p>
            </form>
        </Modal>
    )
}
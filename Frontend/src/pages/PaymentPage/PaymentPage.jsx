import exp from "constants";
import { Fragment, useState } from "react";

import styles from './PaymentPage.module.css'


const HOLDER_COURSE = 
    {
        title: "Tabla Tabla",
        teacher: "John Doe",
        price: "150",
        description: "This is a course about tabla",
        _id: '3',
        imageUrl: "https://masterofmusic.onrender.com/images/fam-solos.jpg"
    }






function PaymentPage(){

    const [course,setCourse] = useState(HOLDER_COURSE);
    
    const piiche = () => {
        // Implement the piiche function here
      };
    
      const confrm = () => {
        // Implement the confrm function here
      };
    
      const copyToClip = (phoneNumber) => {
        // Implement the copyToClip function here
      };

    return(
        <Fragment>
           (
    <div className={styles.checkoutbody}>
      <div className={styles.centerWrapper}> {/* Use CSS Modules for class names */}
        <div className={styles.content}>
          <div className={styles.topBar}>
            <div>
              <i className="fas fa-arrow-left"></i>
              <span className={styles.bb} onClick={piiche}>Go Back</span>
            </div>
          </div>
          <div className={styles.bagProduct}> {/* Combine multiple class names */}
            <div className={styles.courseImg}>
              <img src={course.imageUrl} className={styles.img1} alt="Course" />
            </div>
            <div className={styles.description}>
              <p className={styles.productCode + ' ' + styles.small} style={{ color: 'grey' }}>
                Product code: {course._id}
              </p>
              <h1 className={styles.course_title}>{course.title}</h1>
              <p className={styles.teacher}>By {course.teacher}</p> {/* Make sure 'course.teacher' is an array */}
              <p className={styles.courseInfo}>{course.description}</p>
            </div>
          </div>
          <div className={styles.bagTotal}>
            <div className={styles.total}>
              <h3>Price:</h3>
              <h3>${course.price}</h3>
            </div>
            <div style={{ margin: '1rem 0' }} id="abracadbra">
              <input type="checkbox" name="promo-check" id="mycheck" />
              <label htmlFor="promo-check">I have a promo code</label>
            </div>
            {/* <div className={styles.promoWarning} id="warn1">
              <p className={styles.warn1}>Please Enter a Promo Code!</p>
            </div>
            <div className={styles.promoWarning} id="warn2">
              <p className={styles.warn1}>Promo Code Should be AlphaNumeric and at least 6 characters long!</p>
            </div>
            <div className={styles.promoWarning} id="warn3">
              <p className={styles.warn1}>Invalid Promo Code!</p>
            </div>
            <div className={styles.promoWarning + ' ' + styles.good90} style={{ color: '#22ad3a' }}>
              <p className={styles.warn1}>Promo Code Applied</p>
            </div> */}
            <div className={styles.promoCode} id="promo_input">
              <input
                type="text"
                name="promo-checkbox"
                id="promo"
                placeholder="Enter your promo code here"
              />
              <button className={styles.apply} onClick={confrm}>Apply</button>
            </div>
            <form action={`/purchase/${course._id}`} method="post">
              <button className={styles.checkbtn} type="submit" id="chkout">
                <div>Proceed to Checkout</div>
              </button>
            </form>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '0.7rem' }}>
            <abbr title="Click To Copy Phone Number" style={{ textDecoration: 'none' }} id="ccpy">
              <p className={styles.hlp} onClick={() => copyToClip('8076779704')}>
                Need help? Call +91 8076779704
              </p>
            </abbr>
          </div>
        </div>
      </div>
      <div className={styles.bg}></div>
      {/* <div className={styles.popContainer}>
        <div className={styles.popover1} id="rem123">
          <div style={{ textAlign: 'center' }}>Copied To Clipboard!</div>
        </div>
      </div> */}
    </div>
  );
        </Fragment>
    )
}


export default PaymentPage;
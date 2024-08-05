
import $ from 'jquery'
import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import useState from 'react-usestateref'
import { auth0, deleteLove, getBasketItemAll, getLove } from '../https/Api';
import NavBar from '../NavBar';

function Account() {
    const [userId,setuserId,setuserIdRef] = useState(null)
    const [love,setlove,setloveRef] = useState(null)
    const [ord,setord,setordRef] = useState(null)
    const [skoka,setskoka,setskokaRef] = useState(null)

    useEffect(()=>{

if(setloveRef.current==null){
    gel()
}
    })
    const getBasketItem = async() => {
   
        const storedToken = localStorage.getItem('token');
        if(storedToken==null || storedToken==undefined){
            await auth0()
            getBasketItem()
          }else{
            const userId = jwtDecode(storedToken)
            console.log(userId.id)
            const basketitem = await getBasketItemAll(userId.id)
        
            let skok = 0
            const skok1 = basketitem.map(item=> skok = Number(skok) + Number(item.qauantity))
            setskoka(skok)
          }
      
        
    
      }
      useEffect(()=>{
        if(setskokaRef?.current==null){
          getBasketItem()
        }
      })
    
    const delet = async(id) => {

        const aa = await deleteLove(id)
        const storedToken = localStorage.getItem('token');
        if(storedToken==null || storedToken==undefined){
            await auth0()
            delet()
          }
        const userId = jwtDecode(storedToken)
        setuserId(userId.id)
        const lov=  await getLove(userId.id)
        setlove(lov)
      
        }

    const gel = async() => {

        const storedToken = localStorage.getItem('token');
        if(storedToken==null || storedToken==undefined){
            await auth0()
            gel()
          }
        const userId = jwtDecode(storedToken)
        setuserId(userId.id)
        const lov=  await getLove(userId.id)
        setlove(lov)
        console.log(lov)
        }



    return (
      <div className="App">
<NavBar skoka={setskokaRef?.current}/>




  <main>
    <div class="mb-4 pb-4"></div>
    <section class="my-account container">
      <h2 class="page-title">Wishlist</h2>
      <div class="row">
        <div class="col-lg-3">
          <ul class="account-nav">
            <li><a href="http://localhost:3000/order" class="menu-link menu-link_us-s">Orders</a></li>
            <li><a href="http://localhost:3000/account" class="menu-link menu-link_us-s menu-link_active">Wishlist</a></li>
            <li><a href="http://localhost:3000/store/New_Sale" class="menu-link menu-link_us-s">Shop</a></li>
          </ul>
        </div>
        <div class="col-lg-9">
          <div class="page-content my-account__wishlist">
            {/* <div class="products-grid row row-cols-2 row-cols-lg-3" id="products-grid" >
              <div class="product-card-wrapper">


                <div class="product-card mb-3 mb-md-4 mb-xxl-5">
                {setloveRef?.current?.map(item=>
<div>
                  <div class="pc__img-wrapper">
                    <div class="swiper-container background-img js-swiper-slider" data-settings='{"resizeObserver": true}'>

    
    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                          <img loading="lazy" src={item.Item.Item_photo[0].photo} width="330" height="400" alt="Cropped Faux leather Jacket" class="pc__img"/>
                        </div>
                        <div class="swiper-slide">
                          <img loading="lazy" src={item.Item.Item_photo[1].photo} width="330" height="400" alt="Cropped Faux leather Jacket" class="pc__img"/>
                        </div>

                      </div>

                      

                    </div>
                    <button class="btn-remove-from-wishlist">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><use href="#icon_close" /></svg>
                    </button>
                  </div>
      
                  <div class="pc__info position-relative">
                    <p class="pc__category">Dresses</p>
                    <h6 class="pc__title">{item.Item.name}</h6>
                   {
                      item.skidka!=0?
                      <div class="product-card__price d-flex">
                      <span class="money price price-old">${item.price}</span>
                      <span class="money price price-sale">${(item.price*((100-item.skidka)/100)).toFixed(2)}</span>
                    </div>
                    :
                    <div class="product-card__price d-flex">
                    <span class="money price ">${item.price}</span>
                  </div>
                    }
      
                    <button class="pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist" title="Add To Wishlist">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><use href="#icon_heart" /></svg>
                    </button>
                  </div>
                  </div>
                  )}
                </div>

              

              </div>
      
            
            </div> */}
    <div class="products-grid row row-cols-2 row-cols-md-3 row-cols-lg-4" id="products-grid" >
      {setloveRef?.current?.map(item=>
            <div class="col-6 col-md-4 col-lg-3" o>
              <div class="product-card mb-3 mb-md-4 mb-xxl-5">
                <div  class="pc__img-wrapper">
                  <a href={`http://localhost:3000/item/${item.Item.id}`}>
                    <img loading="lazy" src={item.Item.Item_photo[0].photo} width="330" height="400" alt="Cropped Faux leather Jacket" class="pc__img"/>
                    <img loading="lazy" src={item.Item.Item_photo[1].photo} width="330" height="400" alt="Cropped Faux leather Jacket" class="pc__img pc__img-second"/>
                  </a>
                  <a href={`http://localhost:3000/item/${item.Item.id}`} class="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"  data-aside="cartDrawer" title="Go To Cart">Go To Cart</a>
                </div>

                <div class="pc__info position-relative">
                  <p class="pc__category">For You</p>
                  <button  onClick={()=>delet(item.id)} class="pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist active" title="Add To Wishlist">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><use href="#icon_heart"></use></svg>
                </button>
                  <h6 class="pc__title"><a >{item.Item.name}</a></h6>

                    {
                      item.Item.skidka!=0?
                      <div class="product-card__price d-flex">
                      <span class="money price price-old">${(item.Item.price/((100-item.Item.skidka)/100)).toFixed(2)}</span>
                      <span class="money price price-sale">${item.Item.price}</span>
                    </div>
                    :
                    <div class="product-card__price d-flex">
                    <span class="money price ">${item.Item.price}</span>
                  </div>
                    }
           
                

                  <button onClick={()=>delet(item.id)}  class="pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist active" title="Add To Wishlist">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.463 6.02421 11.4664 6.02765 11.4698 6.03106L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM13.4698 8.03034C13.7627 8.32318 14.2376 8.32309 14.5304 8.03014C14.8233 7.7372 14.8232 7.26232 14.5302 6.96948L13.4698 8.03034ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM11.4698 6.03106L13.4698 8.03034L14.5302 6.96948L12.5302 4.97021L11.4698 6.03106Z" fill="#1C274C"></path> </g></svg>                  </button>
                  
                </div>
                <div class="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">

{ item.Item.skidka!=0?
  <div class="pc-labels__right ms-auto">
                <span class="pc-label pc-label_sale d-block text-white">-{item.Item.skidka}%</span>
              </div>:
              <div> </div>
}
              

            </div>
              </div>
            </div>      
           
            )}

      </div>
  
          </div>
        </div>
      </div>
    </section>
  </main>

  <div class="mb-5 pb-xl-5"></div>
  
  
 

 


  <div id="scrollTop" class="visually-hidden end-0"></div>

  <div class="page-overlay"></div>




      </div>
    );
  }
  
  export default Account;
  
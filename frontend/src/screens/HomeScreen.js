import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

import {Row, Col} from 'react-bootstrap'
import {listProducts} from '../Actions/ProductActions'


const HomeScreen = ({match}) => {

    const dispatch = useDispatch();
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const productList = useSelector(state => state.productList)
    const {loading, error , products, page, pages} = productList

    useEffect(()=>{
        dispatch(listProducts(keyword, pageNumber))
    },[dispatch, keyword, pageNumber])

    return (
        <>  
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>}
            <h1>Latest Products</h1>
            { loading ? <h2><Loader /></h2> : error ? <h2> <Message variant='danger'>{error}</Message> </h2> : 
                <>
                    <Meta />
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} ms={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''}/>
                </>}
            
        </>
    )
}

export default HomeScreen

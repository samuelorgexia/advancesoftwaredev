import React from 'react'
import BidDisplay from '../../components/BidDisplay/BidDisplay'

export default function Auction(props) {
    return (
        <div>
            <BidDisplay auctionId={props.match.params.id}/>
        </div>
    )
}

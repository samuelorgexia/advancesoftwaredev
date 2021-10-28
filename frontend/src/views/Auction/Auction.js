import React from 'react';
import BidDisplay from '../../components/BidDisplay/BidDisplay';
import { AuthService } from '../../services/AuthService';

export default function Auction(props) {
    return (
        <div>
            {AuthService.isSignedIn() ?
                <BidDisplay auctionId={props.match.params.id}/> :
                <p>Please Login to view the aucton and make a bid!!!!!</p>
            }
        </div>
    )
}

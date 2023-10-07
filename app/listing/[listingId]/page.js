'use client'

import ListingDetail from "../../lib/ListingDetail"
import { EXAMPLE_ITEM, generateItem } from "../../constants"
import React, { useState, useEffect } from "react"


export default function ListingPage({ params }) {
    const { listingId } = params

    return (
        <div>
            <ListingDetail listingId={listingId} />
        </div>
    )
}
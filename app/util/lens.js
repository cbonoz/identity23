

import { LensClient, production } from "@lens-protocol/client";

const lensClient = new LensClient({
    environment: production
});

export const getProfileById = (profileId) => {
    return lensClient.profile.fetch({ profileId })  // ex: '0x0635'
}

export const getProfileByHandle = (handle) => {
    return lensClient.profile.fetch({
        handle,
    })
}

export const searchProfiles = (query, limit) => {
    return lensClient.search.profiles({
        query,
        limit: limit || 10
    })
}

import { auth } from "@clerk/nextjs/server"


export const getBearerToken = async () => {

    const { getToken } = await auth()

    const token = await getToken()


    return token || ''
}

import { getPayload as getPayloadInstance } from 'payload'
import config from '@payload-config'

/** Cached Payload Local API client for server-side data fetching. */
export async function getPayloadClient() {
  return getPayloadInstance({ config })
}

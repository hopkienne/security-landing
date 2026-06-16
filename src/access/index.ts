import type { Access } from 'payload'

/** Anyone (including anonymous public visitors) may perform the operation. */
export const anyone: Access = () => true

/** Only authenticated admin users. */
export const adminsOnly: Access = ({ req: { user } }) => Boolean(user)

/**
 * Public read of *published* docs only; admins see everything. Used by content
 * collections that have a `status` field.
 */
export const publishedOrAdmin: Access = ({ req: { user } }) => {
  if (user) return true
  return {
    status: {
      equals: 'published',
    },
  }
}

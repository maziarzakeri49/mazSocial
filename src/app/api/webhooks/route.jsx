import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { createOrUpdateUser, deleteUser } from '../../../lib/actions/User'
import { clerkClient } from '@clerk/nextjs/server'


export async function POST(req) {
   // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint.
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Error: Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
  // Create new Svix instance with secret
  const wh = new Webhook(WEBHOOK_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  

  let evt;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt?.data
  const eventType = evt?.type
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)

  if (eventType === 'user.created' ||eventType=== 'user.update') {
    const { id, first_name, last_name, image_url, email_addresses, username } = evt?.data
    try {
      const user = await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username

      );
      if (user && eventType === 'user.created') {
        try {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user._id,
            },
          });

        } catch (error) {
          console.log('error updating user metadata:', error)


        }

      }

    } catch (error) {
      console.log("error creating or update user :", error);
      return new Response('Error ocured', {
        starus: 400,
      });

    }
  }
  if (eventType === 'user.deleted') {
    const { id } = evt?.data
    try {
      await deleteUser(id);

    } catch (error) {
      console.log('Error deletting users:', error);
      return new Response('Error ocured', {
        starus: 400,
      });

    }
  }

  return new Response('', { status: 200 })
}
# LinkedOut

LinkedOut is a user-friendly platform tailored to seasonal workers on the
hunt for job opportunities.

This platform offers a variety of essential features, including user profile
management, job listing services, intelligent job recommendations, streamlined
recruitment processes, transparent review and rating systems, and multilingual
support (initially in French and English).

## Running the platform

LinkedOut is made of two main part: a backend, written in Kotlin, and a mobile
application, written in TypeScript.

### Backend

To run the backend, you can simply start the whole stack using Docker Compose:

```sh
docker compose -f docker-compose.all.yml up -d
```

You will have access to the MinIO web interface through [localhost:8280](http://localhost:8280),
the default username is `minio` and the default password is `miniosecret`.

> [!WARNING]  
> Because it is not possible to generate the access key in advance, you will not have 
> access to features requiring S3 (profile picture and resume uploading) unless
> you manually create an access key in the MinIO web interface and set the
> `S3_ACCESS_KEY` and `S3_SECRET_KEY` environment variables in the `linkedout_profile`
> service.

### Mobile application

First, you'll need to create a `.env` file in the `front/` directory. Here's
a sample file for the Android emulator:

```
EXPO_PUBLIC_API_URL=http://10.0.2.2:9090/api/v1
EXPO_PUBLIC_OIDC_DISCOVERY_URL=https://auth.linkedout.cluster-2020-5.dopolytech.fr/realms/linkedout-dev
EXPO_PUBLIC_OIDC_CLIENT_ID=linkedout-mobile
```

Afterward, install the dependencies and run Expo:

```sh
cd front/
npm i
npm start
```

For the Android emulator, you might need to set your `ANDROID_HOME` environment
variable to point to your Android SDK root:

```sh
ANDROID_HOME='/home/user/Android/Sdk' npm start
```

const {createClient} = require('redis');

const client = createClient({
    password: process.env.redis_database_pass,
    socket: {
        host: process.env.redis_database_host,
        port: process.env.redis_database_port
    }
});

module.exports.getClient = async () => {
    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    await client.set('foo', 'bar');
    const value = await client.get('foo');
    console.log(value)

    return client;
}
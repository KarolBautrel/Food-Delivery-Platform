import redis

pool = redis.ConnectionPool(host="redis", port=6379, db=0, decode_responses=True)
redis_client = redis.Redis(connection_pool=pool)

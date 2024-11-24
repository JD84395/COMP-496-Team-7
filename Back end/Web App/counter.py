from .models import Counter

def get_next_id():
    counter, created = Counter.objects.get_or_create(collection_name="User")
    counter.sequence_value += 1
    counter.save()
    return counter.sequence_value
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_remove_users_userid"),
    ]

    operations = [
        migrations.AddField(
            model_name="users",
            name="user_id",
            field=models.CharField(default=0, max_length=50, unique=True),
            preserve_default=False,
        ),
    ]
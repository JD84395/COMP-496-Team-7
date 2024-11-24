from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_users_user_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="users",
            name="user_id",
            field=models.CharField(max_length=50),
        ),
    ]
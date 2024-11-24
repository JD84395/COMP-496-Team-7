from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0005_rename_user_id_users_user_ids"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="users",
            name="user_ids",
        ),
        migrations.AlterField(
            model_name="users",
            name="email",
            field=models.EmailField(max_length=100, unique=True),
        ),
    ]
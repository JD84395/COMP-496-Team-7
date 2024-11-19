from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0004_alter_users_user_id"),
    ]

    operations = [
        migrations.RenameField(
            model_name="users",
            old_name="user_id",
            new_name="user_ids",
        ),
    ]
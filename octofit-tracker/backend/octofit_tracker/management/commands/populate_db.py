from django.core.management.base import BaseCommand
from octofit_tracker.models import Team, User, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data safely
        for model in [Leaderboard, Activity, Workout, User, Team]:
            objs = model.objects.all()
            for obj in objs:
                if getattr(obj, 'pk', None):
                    obj.delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        users = [
            User(name='Spider-Man', email='spiderman@marvel.com', team=marvel),
            User(name='Iron Man', email='ironman@marvel.com', team=marvel),
            User(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
            User(name='Batman', email='batman@dc.com', team=dc),
        ]
        for user in users:
            user.save()

        # Create workouts
        workouts = [
            Workout(name='Cardio Blast', description='High intensity cardio workout.', difficulty='Hard'),
            Workout(name='Strength Builder', description='Full body strength training.', difficulty='Medium'),
        ]
        for workout in workouts:
            workout.save()

        # Create activities
        Activity.objects.create(user=users[0], type='Running', duration=30, calories=300)
        Activity.objects.create(user=users[1], type='Cycling', duration=45, calories=400)
        Activity.objects.create(user=users[2], type='Swimming', duration=60, calories=500)
        Activity.objects.create(user=users[3], type='Yoga', duration=40, calories=200)

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=700)
        Leaderboard.objects.create(team=dc, points=700)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))

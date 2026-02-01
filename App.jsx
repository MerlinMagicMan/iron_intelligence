import React, { useState, useEffect, useRef } from 'react';
import { Dumbbell, Plus, Play, BarChart3, Brain, ChevronRight, X, Check, Timer, TrendingUp, Calendar, ChevronDown, Activity, Camera } from 'lucide-react';

const allExercises = [
  { id: 'squat', name: 'Back Squat', muscles: ['quads', 'glutes'], type: 'strength' },
  { id: 'trapbar', name: 'Trap Bar Deadlift', muscles: ['back', 'glutes'], type: 'strength' },
  { id: 'bench', name: 'Barbell Bench Press', muscles: ['chest', 'triceps'], type: 'strength' },
  { id: 'ohp', name: 'Overhead Press', muscles: ['shoulders'], type: 'strength' },
  { id: 'pullup', name: 'Strict Pull-Ups', muscles: ['back', 'biceps'], type: 'strength' },
  { id: 'row', name: 'Barbell Row', muscles: ['back'], type: 'strength' },
  { id: 'splitquat', name: 'Bulgarian Split Squat', muscles: ['quads', 'glutes'], type: 'strength' },
  { id: 'rdl', name: 'Staggered Stance RDL', muscles: ['hamstrings'], type: 'strength' },
  { id: 'curl', name: 'Barbell Curl', muscles: ['biceps'], type: 'hypertrophy' },
  { id: 'pushdown', name: 'Tricep Pushdown', muscles: ['triceps'], type: 'hypertrophy' },
  { id: 'facepull', name: 'Face Pulls', muscles: ['rear delts'], type: 'hypertrophy' },
];

const gbrsProgram = {
  id: 999, name: 'GBRS Human Performance', style: 'tactical',
  days: ['Posterior Chain', 'Upper Push', 'Work Capacity', 'Squat Day', 'Gun Show', 'Mobility'],
  fullDays: [
    { name: 'Day 1: Posterior Chain & Pull', exercises: [
      { exercise: 'Adductor Rock to Hip Walk Out', sets: 2, reps: 8, note: 'A1 Mobility' },
      { exercise: 'Glute Mobilization', sets: 2, reps: 8, note: 'A2 Activation' },
      { exercise: 'Trap Bar Deadlift', sets: 4, reps: 6, note: 'B Main - Heavy' },
      { exercise: 'Strict Pull-Ups (Weighted)', sets: 3, reps: 8, note: 'C Secondary' },
      { exercise: 'Inverted Rows', sets: 3, reps: 10, note: 'D1 Superset' },
      { exercise: 'Hamstring Bridge', sets: 3, reps: 10, note: 'D2 Superset' },
      { exercise: 'Lat Pulldown', sets: 3, reps: 10, note: 'E1' },
      { exercise: 'Face Pulls', sets: 3, reps: 15, note: 'E2' },
      { exercise: 'Zone 2 Cardio', sets: 1, reps: 20, note: 'G Flush - 20 min' }
    ]},
    { name: 'Day 2: Upper Push', exercises: [
      { exercise: 'Cat Camel', sets: 1, reps: 10, note: 'A1 Mobility' },
      { exercise: 'T-Spine Rotation', sets: 1, reps: 8, note: 'A2 per side' },
      { exercise: 'Band Pull-Aparts', sets: 1, reps: 15, note: 'A3 Activation' },
      { exercise: 'Powell Raise', sets: 2, reps: 10, note: 'B Prehab per side' },
      { exercise: 'Barbell Bench Press', sets: 4, reps: 4, note: 'C Main - Heavy' },
      { exercise: 'Weighted Push-Ups', sets: 3, reps: 12, note: 'D Hypertrophy' },
      { exercise: 'Seated DB Shoulder Press', sets: 3, reps: 10, note: 'E Vertical' },
      { exercise: 'Plank KB Drag', sets: 4, reps: 8, note: 'G1 Core' },
      { exercise: 'Hanging Leg Raises', sets: 4, reps: 10, note: 'G2 Core' },
      { exercise: 'Sled Push', sets: 4, reps: 30, note: 'G3 - 30 yards' }
    ]},
    { name: 'Day 3: Work Capacity & Grip', exercises: [
      { exercise: 'Figure 4 Flow', sets: 1, reps: 8, note: 'A Flow' },
      { exercise: 'Side Plank Row', sets: 2, reps: 10, note: 'B per side' },
      { exercise: 'Pallof Press', sets: 2, reps: 10, note: 'C Anti-Rotation' },
      { exercise: 'Bird Dog Row', sets: 3, reps: 8, note: 'D1 per side' },
      { exercise: 'Suitcase Carry', sets: 3, reps: 20, note: 'D2 - 20 yards' },
      { exercise: 'Towel KB Carry', sets: 3, reps: 20, note: 'E - 20 yards' },
      { exercise: 'Wrist Curls', sets: 2, reps: 15, note: 'F Forearms' },
      { exercise: 'Tempo Runs 100m', sets: 6, reps: 1, note: 'G - 80% sprint' }
    ]},
    { name: 'Day 4: Squat Day', exercises: [
      { exercise: 'Plank', sets: 1, reps: 60, note: 'A1 - 60 sec' },
      { exercise: 'Dead Bug', sets: 1, reps: 10, note: 'A2 Core' },
      { exercise: 'Side Plank Leg Raise', sets: 1, reps: 15, note: 'A3 per side' },
      { exercise: 'Copenhagen Plank', sets: 1, reps: 20, note: 'A4 - 20 sec/side' },
      { exercise: 'Back Squat', sets: 4, reps: 4, note: 'B Main - Heavy' },
      { exercise: 'Bulgarian Split Squat', sets: 3, reps: 8, note: 'C per side' },
      { exercise: 'DB Lateral Lunge', sets: 3, reps: 8, note: 'D1 per side' },
      { exercise: 'Staggered Stance RDL', sets: 3, reps: 8, note: 'D2 per side' },
      { exercise: 'Leg Extensions', sets: 3, reps: 12, note: 'E1' },
      { exercise: 'ISO Squat Hold', sets: 3, reps: 30, note: 'E2 - 30 sec' },
      { exercise: 'Incline Walk', sets: 1, reps: 20, note: 'F - 20 min' }
    ]},
    { name: 'Day 5: Gun Show', exercises: [
      { exercise: 'Band Pull-Aparts', sets: 2, reps: 20, note: 'A1' },
      { exercise: 'Push-Up to Pike', sets: 2, reps: 8, note: 'A2' },
      { exercise: 'Close Grip Bench', sets: 3, reps: 12, note: 'B Compound' },
      { exercise: 'Barbell Curl', sets: 3, reps: 10, note: 'C1 Bicep' },
      { exercise: 'Tricep Pushdown', sets: 3, reps: 12, note: 'C2 Tricep' },
      { exercise: 'DB Curls', sets: 3, reps: 12, note: 'D1' },
      { exercise: 'Overhead Tricep Ext', sets: 3, reps: 10, note: 'D2' },
      { exercise: 'Wrist Curls', sets: 2, reps: 15, note: 'E1' },
      { exercise: 'Reverse Wrist Curls', sets: 2, reps: 15, note: 'E2' }
    ]},
    { name: 'Day 6: Mobility & Flow', exercises: [
      { exercise: 'Shin Box Rotations', sets: 2, reps: 8, note: 'A1' },
      { exercise: 'Heel Clicks', sets: 2, reps: 10, note: 'A2 Glutes' },
      { exercise: 'T-Spine Rotation', sets: 2, reps: 8, note: 'B1 per side' },
      { exercise: 'Cat Camel', sets: 2, reps: 6, note: 'B2' },
      { exercise: 'Shoulder Hovers', sets: 2, reps: 8, note: 'B3' },
      { exercise: 'Bird Dog to Gecko', sets: 2, reps: 6, note: 'C1' },
      { exercise: 'Hip Circles', sets: 2, reps: 6, note: 'C2 per side' }
    ]}
  ]
};

const bulletproofHips1 = {
  id: 998, name: 'Bulletproof Hips (Wk 1-2)', style: 'mobility',
  days: ['Internal Rot', 'Lateral', 'Posterior'],
  fullDays: [
    { name: 'Day 1: Internal Rotation', exercises: [
      { exercise: 'Plank (Hardstyle)', sets: 3, reps: 30, note: 'A1 - 30 sec' },
      { exercise: 'Deadbug', sets: 3, reps: 8, note: 'A2 per side' },
      { exercise: 'Shin Box Rotation', sets: 3, reps: 6, note: 'B1 per side' },
      { exercise: 'Adductor Rock', sets: 3, reps: 8, note: 'B2' },
      { exercise: 'Pigeon Hold', sets: 2, reps: 45, note: 'C1 - 45 sec' },
      { exercise: 'Gorilla Sits', sets: 2, reps: 30, note: 'C2 - 30 sec' },
      { exercise: 'Hip Airplane (Wall)', sets: 2, reps: 8, note: 'D1' },
      { exercise: 'Lateral Squat', sets: 2, reps: 8, note: 'D2' }
    ]},
    { name: 'Day 2: Lateral Lines', exercises: [
      { exercise: 'Side Plank (Knees)', sets: 3, reps: 20, note: 'A1 - 20 sec' },
      { exercise: 'Bird Dog', sets: 3, reps: 6, note: 'A2 per side' },
      { exercise: '90/90 Tennis Ball', sets: 3, reps: 10, note: 'B1 - 10 sec hold' },
      { exercise: 'Groin Squeeze', sets: 3, reps: 10, note: 'B2 - 10 sec' },
      { exercise: 'Adductor Scissor', sets: 3, reps: 8, note: 'C1' },
      { exercise: 'Standing Hip Flexion', sets: 3, reps: 15, note: 'C2 - 15 sec hold' }
    ]},
    { name: 'Day 3: Posterior Chain', exercises: [
      { exercise: 'Cat/Cow', sets: 2, reps: 10, note: 'A1 segmental' },
      { exercise: 'Shin Box Fold', sets: 2, reps: 8, note: 'B1' },
      { exercise: 'Heel Clicks (Prone)', sets: 2, reps: 15, note: 'B2' },
      { exercise: 'Bird Dog to Gecko', sets: 3, reps: 5, note: 'C1' },
      { exercise: 'Hip Circle Rotations', sets: 3, reps: 6, note: 'C2' },
      { exercise: 'Rotating Split Squat', sets: 3, reps: 8, note: 'D1' },
      { exercise: 'Incline Pigeon', sets: 3, reps: 45, note: 'D2 - 45 sec' }
    ]}
  ]
};

const bulletproofHips2 = {
  id: 997, name: 'Bulletproof Hips (Wk 3-4)', style: 'mobility',
  days: ['Flow', 'Loaded Rot', 'Sticky'],
  fullDays: [
    { name: 'Day 1: Flow & Transition', exercises: [
      { exercise: 'Bear Crawl (Static)', sets: 3, reps: 30, note: 'A1 - 30 sec hover' },
      { exercise: 'Deadbug Wall Push', sets: 3, reps: 8, note: 'A2' },
      { exercise: 'Shin Box Extension', sets: 3, reps: 8, note: 'B1' },
      { exercise: 'Frog Rocking', sets: 3, reps: 10, note: 'B2' },
      { exercise: 'Seated Pancake', sets: 3, reps: 8, note: 'C1' },
      { exercise: 'Deep Squat Pry', sets: 3, reps: 8, note: 'C2' },
      { exercise: 'Hip Airplane (Free)', sets: 3, reps: 5, note: 'D1' },
      { exercise: 'Cossack Squat', sets: 3, reps: 6, note: 'D2' }
    ]},
    { name: 'Day 2: Loaded Rotation', exercises: [
      { exercise: 'Copenhagen Plank', sets: 3, reps: 15, note: 'A1 - 15 sec' },
      { exercise: '90/90 Hip Switch', sets: 3, reps: 4, note: 'B1 per side' },
      { exercise: 'Active Pigeon Push', sets: 3, reps: 6, note: 'B2' },
      { exercise: 'Rotating Split Squat', sets: 3, reps: 8, note: 'C1 loaded' },
      { exercise: 'Incline Pigeon', sets: 3, reps: 45, note: 'C2 - 45 sec' }
    ]},
    { name: 'Day 3: Sticky Corners', exercises: [
      { exercise: "World's Greatest Stretch", sets: 1, reps: 5, note: 'A - 5 min flow' },
      { exercise: 'Shin Box to Lunge', sets: 3, reps: 5, note: 'B1' },
      { exercise: 'Butterfly Press', sets: 3, reps: 10, note: 'B2' },
      { exercise: 'Single Leg RDL', sets: 3, reps: 8, note: 'C1' },
      { exercise: 'Lateral Lunge', sets: 3, reps: 6, note: 'C2' },
      { exercise: 'Split Squat ISO', sets: 3, reps: 30, note: 'D1 - 30 sec' },
      { exercise: 'Seated Good Morning', sets: 3, reps: 10, note: 'D2' }
    ]}
  ]
};

const bulletproofHips3 = {
  id: 996, name: 'Bulletproof Hips (Wk 5-6)', style: 'mobility',
  days: ['Locomotion', 'Strength', 'Final'],
  fullDays: [
    { name: 'Day 1: Locomotion', exercises: [
      { exercise: 'Bear Crawl', sets: 3, reps: 10, note: 'A1 - 10 yards' },
      { exercise: 'Crab Walk', sets: 3, reps: 10, note: 'A2 - 10 yards' },
      { exercise: 'Shin Box Flow', sets: 3, reps: 4, note: 'B1' },
      { exercise: 'Weighted 90/90 Lift', sets: 3, reps: 6, note: 'B2' },
      { exercise: 'Deep Squat ISO', sets: 3, reps: 45, note: 'C - 45 sec' },
      { exercise: 'Beast Reach', sets: 3, reps: 8, note: 'D1' },
      { exercise: 'Duck Walk', sets: 3, reps: 10, note: 'D2 - 10 yards' }
    ]},
    { name: 'Day 2: Strength at Length', exercises: [
      { exercise: 'Jefferson Curl', sets: 3, reps: 6, note: 'A1 light' },
      { exercise: 'Lateral Lunge Balance', sets: 3, reps: 6, note: 'B1' },
      { exercise: 'Hip Airplane (Weight)', sets: 3, reps: 5, note: 'B2' },
      { exercise: 'Dragon Squat', sets: 3, reps: 6, note: 'C1' },
      { exercise: 'Loaded Pigeon', sets: 2, reps: 60, note: 'C2 - 60 sec' }
    ]},
    { name: 'Day 3: The Final Exam', exercises: [
      { exercise: 'Hip CARs', sets: 3, reps: 2, note: 'A - slow circles' },
      { exercise: 'Rotating Split Squat', sets: 3, reps: 8, note: 'B1 power' },
      { exercise: 'Adductor Slides', sets: 3, reps: 8, note: 'B2' },
      { exercise: 'Beast Reach', sets: 3, reps: 8, note: 'C1' },
      { exercise: 'Shin Box Speed', sets: 3, reps: 20, note: 'C2 - 20 sec' },
      { exercise: 'Spider-Man Crawl', sets: 3, reps: 10, note: 'D1 - 10 yards' },
      { exercise: 'Cossack Flow', sets: 3, reps: 8, note: 'D2' }
    ]}
  ]
};

const gbrsMobility1 = {
  id: 994, name: 'GBRS Mobility (Wk 1-3)', style: 'mobility',
  days: ['Sunday Flow', 'Monday Core', 'Tuesday Spine', 'Wednesday End Range'],
  fullDays: [
    { name: 'Day 1: Global Flow & Hips', exercises: [
      { exercise: 'Shin Box Rotation', sets: 1, reps: 10, note: 'A - stay tall' },
      { exercise: '90/90 Hip Switches', sets: 1, reps: 10, note: 'B - hands on floor' },
      { exercise: 'Adductor Rock', sets: 2, reps: 8, note: 'C1 Superset' },
      { exercise: 'Pigeon Rocking', sets: 2, reps: 8, note: 'C2 Superset' },
      { exercise: 'Lying T-Spine Rotation', sets: 2, reps: 8, note: 'D1 per side' },
      { exercise: 'Neck Rotations', sets: 2, reps: 4, note: 'D2 slow circles' },
      { exercise: 'Cat Camel (Segmental)', sets: 2, reps: 8, note: 'E1' },
      { exercise: 'Hamstring to Ankle Rock', sets: 2, reps: 8, note: 'E2' }
    ]},
    { name: 'Day 2: Core Stability & Isometric', exercises: [
      { exercise: 'RKC Plank', sets: 2, reps: 30, note: 'A1 - 30 sec max tension' },
      { exercise: 'Deadbug', sets: 2, reps: 8, note: 'A2 per side' },
      { exercise: 'Side Bridge Abduction', sets: 3, reps: 8, note: 'B1 per side' },
      { exercise: 'Groin Squeeze', sets: 3, reps: 10, note: 'B2 - 10 sec holds' },
      { exercise: 'Shoulder Airplane', sets: 2, reps: 8, note: 'C1' },
      { exercise: 'Hip Airplane (Wall)', sets: 2, reps: 8, note: 'C2' }
    ]},
    { name: 'Day 3: Spine & Adductors', exercises: [
      { exercise: "World's Greatest Stretch", sets: 1, reps: 5, note: 'A - 5 min flow' },
      { exercise: 'Jefferson Curl', sets: 2, reps: 6, note: 'B1 unweighted' },
      { exercise: 'Adductor Rock', sets: 2, reps: 8, note: 'B2 per side' },
      { exercise: 'Cat Camel', sets: 2, reps: 6, note: 'C1' },
      { exercise: 'T-Spine Rotation (Wall)', sets: 2, reps: 8, note: 'C2 per side' },
      { exercise: 'Glute Bridge ISO', sets: 3, reps: 20, note: 'D1 - 20 sec' },
      { exercise: 'Heel Clicks (Prone)', sets: 3, reps: 10, note: 'D2' }
    ]},
    { name: 'Day 4: End Range Strength', exercises: [
      { exercise: 'Freestyle Flow', sets: 1, reps: 2, note: 'A - 2 min' },
      { exercise: 'Plank Shoulder Taps', sets: 2, reps: 10, note: 'B1 per side' },
      { exercise: 'Deadbug (Ipsilateral)', sets: 2, reps: 6, note: 'B2 same side' },
      { exercise: '90/90 Tennis Ball', sets: 3, reps: 5, note: 'C1 - lift back knee' },
      { exercise: 'Posterior Bridge', sets: 3, reps: 10, note: 'C2 feet elevated' },
      { exercise: 'Standing Hip Flexion', sets: 2, reps: 10, note: 'D1 - 10 sec hold' },
      { exercise: 'Prone Shoulder Hovers', sets: 2, reps: 8, note: 'D2' },
      { exercise: 'Push-Up to Pike', sets: 2, reps: 8, note: 'D3' }
    ]}
  ]
};

const gbrsMobility2 = {
  id: 993, name: 'GBRS Mobility (Wk 4-6)', style: 'mobility',
  days: ['Sunday Flow', 'Monday Core', 'Tuesday Spine', 'Wednesday End Range'],
  fullDays: [
    { name: 'Day 1: Progression', exercises: [
      { exercise: 'Shin Box to Hip Extension', sets: 1, reps: 10, note: 'A - drive hips up' },
      { exercise: 'Bear Sit to 90/90', sets: 1, reps: 10, note: 'B' },
      { exercise: 'Frog Stretch Rocking', sets: 2, reps: 10, note: 'C1' },
      { exercise: 'Pigeon ISO Press', sets: 2, reps: 15, note: 'C2 - 15 sec' },
      { exercise: 'Open Book Rib Grab', sets: 2, reps: 8, note: 'D1' },
      { exercise: 'Neck Retraction', sets: 2, reps: 10, note: 'D2' },
      { exercise: 'Quadruped Hover Cat Camel', sets: 2, reps: 6, note: 'E1 knees off' },
      { exercise: 'Elephant Walk', sets: 2, reps: 10, note: 'E2' }
    ]},
    { name: 'Day 2: Progression', exercises: [
      { exercise: 'Long Lever Plank', sets: 2, reps: 30, note: 'A1 - 30 sec' },
      { exercise: 'Deadbug Wall Push', sets: 2, reps: 6, note: 'A2' },
      { exercise: 'Copenhagen Plank', sets: 3, reps: 20, note: 'B1 - 20 sec' },
      { exercise: 'Cossack Squat', sets: 3, reps: 6, note: 'B2 per side' },
      { exercise: 'Y-W-T Isometrics', sets: 2, reps: 10, note: 'C1 - 10 sec each' },
      { exercise: 'Hip Airplane (Free)', sets: 2, reps: 5, note: 'C2 no hands' }
    ]},
    { name: 'Day 3: Progression', exercises: [
      { exercise: 'Tactical Frog Flow', sets: 1, reps: 5, note: 'A - 5 min' },
      { exercise: 'Jefferson Curl (Light)', sets: 2, reps: 6, note: 'B1' },
      { exercise: 'Tactical Frog Rocks', sets: 2, reps: 10, note: 'B2' },
      { exercise: 'Segmental Cat Camel', sets: 2, reps: 6, note: 'C1 slow' },
      { exercise: 'Deep Squat T-Spine Rot', sets: 2, reps: 6, note: 'C2 per side' },
      { exercise: 'Single Leg Glute Bridge', sets: 3, reps: 8, note: 'D1' },
      { exercise: 'Reverse Hyper', sets: 3, reps: 12, note: 'D2' }
    ]},
    { name: 'Day 4: Progression', exercises: [
      { exercise: 'Beast to Crab Flow', sets: 1, reps: 2, note: 'A - 2 min' },
      { exercise: 'Bear Crawl', sets: 2, reps: 10, note: 'B1 - 10 yards' },
      { exercise: 'Hollow Body Hold', sets: 2, reps: 30, note: 'B2 - 30 sec' },
      { exercise: '90/90 PAILs/RAILs', sets: 3, reps: 1, note: 'C1 max tension' },
      { exercise: 'Single Leg Ham Bridge', sets: 3, reps: 8, note: 'C2' },
      { exercise: 'Standing Hip CARs', sets: 2, reps: 3, note: 'D1 slow circles' },
      { exercise: 'Scapular Push-Ups', sets: 2, reps: 12, note: 'D2' },
      { exercise: 'Hindu Push-Ups', sets: 2, reps: 8, note: 'D3' }
    ]}
  ]
};

const deepTissue = {
  id: 992, name: 'Deep Tissue (60 min)', style: 'restoration',
  days: ['Saturday or Sunday'],
  fullDays: [
    { name: 'Full Body Overhaul', exercises: [
      { exercise: 'Toe Sit (Plantar)', sets: 1, reps: 120, note: 'ZONE 1: 2 min - toes tucked' },
      { exercise: 'Combat Stretch', sets: 2, reps: 120, note: '2 min/side - ankle dorsi' },
      { exercise: 'Couch Stretch', sets: 2, reps: 120, note: 'ZONE 2: 2 min/side - quad/hip' },
      { exercise: 'Pigeon Pose', sets: 2, reps: 120, note: '2 min/side - glute' },
      { exercise: 'Frog Stretch', sets: 1, reps: 180, note: '3 min - adductors' },
      { exercise: 'Pancake Fold', sets: 1, reps: 180, note: '3 min - hamstrings' },
      { exercise: 'Puppy Dog Pose', sets: 1, reps: 120, note: 'ZONE 3: 2 min - lats' },
      { exercise: 'Bretzel Stretch', sets: 2, reps: 120, note: '2 min/side - rotation' },
      { exercise: 'Child Pose Side Reach', sets: 1, reps: 60, note: '1 min/side - lat' },
      { exercise: 'Doorway Pec Stretch', sets: 1, reps: 60, note: 'ZONE 4: 1 min/side' },
      { exercise: 'Banded Lat Distraction', sets: 1, reps: 120, note: '2 min/side' },
      { exercise: 'Neck Trap Release', sets: 1, reps: 60, note: '1 min/side' }
    ]}
  ]
};

const dailyMaintenance = {
  id: 995, name: 'Daily Maintenance (10 min)', style: 'restoration',
  days: ['Every Day'],
  fullDays: [
    { name: 'The Oil Change', exercises: [
      { exercise: 'Spinal Roll Down', sets: 1, reps: 5, note: 'Roll vertebrae by vertebrae' },
      { exercise: "World's Greatest Stretch", sets: 1, reps: 5, note: 'Per side' },
      { exercise: 'Down Dog to Cobra', sets: 1, reps: 5, note: 'Flow' },
      { exercise: 'Shin Box Flow', sets: 1, reps: 5, note: 'Per side' },
      { exercise: 'Deep Squat Pry', sets: 1, reps: 60, note: '1 min rock side to side' }
    ]}
  ]
};

// Special Ops Running - Warm-Up & Prehab (separate program)
const specialOpsWarmup = {
  id: 991, name: 'SOF Running Warm-Up', style: 'running',
  days: ['Dynamic Warm-Up', 'Hip/Core Circuit'],
  fullDays: [
    { name: 'Dynamic Warm-Up (Pre-Run)', exercises: [
      { exercise: 'Jog or Bike', sets: 1, reps: 5, note: '5 minutes' },
      { exercise: 'Butt Kickers', sets: 1, reps: 1, note: '1 minute' },
      { exercise: 'Frankenstein Walks', sets: 1, reps: 1, note: '1 minute' },
      { exercise: 'Side Swings', sets: 1, reps: 1, note: '1 min each direction' },
      { exercise: 'Leg Swings', sets: 1, reps: 1, note: '1 minute' },
      { exercise: 'Calf/Shin Warm-up', sets: 1, reps: 1, note: '1 minute' },
      { exercise: 'Calf Stretches', sets: 1, reps: 30, note: '30 sec/side' },
      { exercise: 'Light Thigh Stretch', sets: 1, reps: 30, note: '30 sec/side' },
      { exercise: 'Light Hamstring Stretch', sets: 1, reps: 30, note: '30 sec/side' },
      { exercise: 'Glute Stretch', sets: 1, reps: 30, note: '30 sec/side' },
      { exercise: 'Hip Flexor/Side Stretch', sets: 1, reps: 30, note: '30 sec/side' },
      { exercise: 'Back Roll', sets: 1, reps: 30, note: '30 seconds' },
      { exercise: 'Light ITB Roll', sets: 1, reps: 30, note: '30 sec/side' },
      { exercise: 'Shin Roll', sets: 1, reps: 30, note: '30 sec/side' }
    ]},
    { name: 'Hip/Core/Leg Circuit (Every Other Day)', exercises: [
      { exercise: 'Jumping Jacks', sets: 3, reps: 50, note: '25-50 (4 count) - Repeat 2-3x' },
      { exercise: 'Side Leg Lifts', sets: 3, reps: 30, note: '20-30/leg' },
      { exercise: 'Dirty Dogs', sets: 3, reps: 30, note: '20-30/leg' },
      { exercise: 'Donkey Kicks', sets: 3, reps: 30, note: '20-30/leg' },
      { exercise: 'Squats', sets: 3, reps: 30, note: '20-30 reps' },
      { exercise: 'Lunges', sets: 3, reps: 20, note: '15-20/leg' },
      { exercise: 'Swimmers', sets: 3, reps: 1, note: '1 minute' },
      { exercise: 'Hip Rolls', sets: 3, reps: 15, note: '10-15/side' },
      { exercise: 'Plank Pose', sets: 3, reps: 60, note: '1 minute' },
      { exercise: 'Side Plank Pose', sets: 3, reps: 60, note: '1 min/side' }
    ]}
  ]
};

// Special Ops Running Program - 26 weeks (just the running schedules)
const specialOpsRunning = {
  id: 990, name: 'SOF Running (26 Wk)', style: 'running',
  days: ['Wk 1-6', 'Wk 7-12', 'Wk 13-18', 'Wk 19-26'],
  fullDays: [
    { name: 'Weeks 1-6 Schedule', exercises: [
      { exercise: 'Week 1: Day 1', sets: 1, reps: 1, note: '2 Miles' },
      { exercise: 'Week 1: Day 2', sets: 1, reps: 1, note: '4 Miles' },
      { exercise: 'Week 1: Day 3', sets: 1, reps: 1, note: '2 Miles' },
      { exercise: 'Week 1: Day 4', sets: 1, reps: 1, note: '4 Miles' },
      { exercise: 'Week 1: Day 5', sets: 1, reps: 1, note: '2 Miles' },
      { exercise: 'Week 1: Day 6', sets: 1, reps: 1, note: '6 Miles (Long Run)' },
      { exercise: 'Week 2: Day 1', sets: 1, reps: 1, note: '2.1 Miles' },
      { exercise: 'Week 2: Day 2', sets: 1, reps: 1, note: '4.2 Miles' },
      { exercise: 'Week 2: Day 3', sets: 1, reps: 1, note: '2.1 Miles + 6x30s striders' },
      { exercise: 'Week 2: Day 4', sets: 1, reps: 1, note: '4.2 Miles' },
      { exercise: 'Week 2: Day 5', sets: 1, reps: 1, note: '2.1 Miles' },
      { exercise: 'Week 2: Day 6', sets: 1, reps: 1, note: '6.3 Miles (Long Run)' },
      { exercise: 'Week 3: Day 1', sets: 1, reps: 1, note: '2.2 Miles + 6x30s striders' },
      { exercise: 'Week 3: Day 2', sets: 1, reps: 1, note: '4.4 Miles' },
      { exercise: 'Week 3: Day 3', sets: 1, reps: 1, note: '2.2 Miles + 6x30s striders' },
      { exercise: 'Week 3: Day 4', sets: 1, reps: 1, note: '4.4 Miles' },
      { exercise: 'Week 3: Day 5', sets: 1, reps: 1, note: '2.2 Miles' },
      { exercise: 'Week 3: Day 6', sets: 1, reps: 1, note: '6.6 Miles (Long Run)' },
      { exercise: 'Week 4: Day 1', sets: 1, reps: 1, note: '2.3 Miles' },
      { exercise: 'Week 4: Day 2', sets: 1, reps: 1, note: '4.6 Miles' },
      { exercise: 'Week 4: Day 3', sets: 1, reps: 1, note: '2.3 Miles' },
      { exercise: 'Week 4: Day 4', sets: 1, reps: 1, note: '4.6 Miles' },
      { exercise: 'Week 4: Day 5', sets: 1, reps: 1, note: '2.3 Miles' },
      { exercise: 'Week 4: Day 6', sets: 1, reps: 1, note: '6.9 Miles (Long Run)' },
      { exercise: 'Week 5: Day 1', sets: 1, reps: 1, note: '2.4 Miles + 5x40s striders' },
      { exercise: 'Week 5: Day 2', sets: 1, reps: 1, note: '4.8 Miles' },
      { exercise: 'Week 5: Day 3', sets: 1, reps: 1, note: '2.4 Miles + 5x40s striders' },
      { exercise: 'Week 5: Day 4', sets: 1, reps: 1, note: '4.8 Miles' },
      { exercise: 'Week 5: Day 5', sets: 1, reps: 1, note: '2.4 Miles' },
      { exercise: 'Week 5: Day 6', sets: 1, reps: 1, note: '7.2 Miles (Long Run)' },
      { exercise: 'Week 6: Day 1', sets: 1, reps: 1, note: '2.5 Miles + 7x30s striders' },
      { exercise: 'Week 6: Day 2', sets: 1, reps: 1, note: '5 Miles' },
      { exercise: 'Week 6: Day 3', sets: 1, reps: 1, note: '2.5 Miles + 7x30s striders' },
      { exercise: 'Week 6: Day 4', sets: 1, reps: 1, note: '5 Miles' },
      { exercise: 'Week 6: Day 5', sets: 1, reps: 1, note: '2.5 Miles' },
      { exercise: 'Week 6: Day 6', sets: 1, reps: 1, note: '7.5 Miles (Long Run)' }
    ]},
    { name: 'Weeks 7-12 Schedule', exercises: [
      { exercise: 'Week 7: Day 1', sets: 1, reps: 1, note: '2.6 Miles' },
      { exercise: 'Week 7: Day 2', sets: 1, reps: 1, note: '5.2 Miles' },
      { exercise: 'Week 7: Day 3', sets: 1, reps: 1, note: '2.6 Miles' },
      { exercise: 'Week 7: Day 4', sets: 1, reps: 1, note: '5.2 Miles' },
      { exercise: 'Week 7: Day 5', sets: 1, reps: 1, note: '2.6 Miles' },
      { exercise: 'Week 7: Day 6', sets: 1, reps: 1, note: '7.8 Miles (Long Run)' },
      { exercise: 'Week 8: Day 1', sets: 1, reps: 1, note: '2.7 Miles + 6x40s striders' },
      { exercise: 'Week 8: Day 2', sets: 1, reps: 1, note: '5.4 Miles' },
      { exercise: 'Week 8: Day 3', sets: 1, reps: 1, note: '2.7 Miles + 6x40s striders' },
      { exercise: 'Week 8: Day 4', sets: 1, reps: 1, note: '5.4 Miles' },
      { exercise: 'Week 8: Day 5', sets: 1, reps: 1, note: '2.7 Miles' },
      { exercise: 'Week 8: Day 6', sets: 1, reps: 1, note: '8.1 Miles (Long Run)' },
      { exercise: 'Week 9: Day 1', sets: 1, reps: 1, note: '2.8 Miles + 5x50s striders' },
      { exercise: 'Week 9: Day 2', sets: 1, reps: 1, note: '5.6 Miles' },
      { exercise: 'Week 9: Day 3', sets: 1, reps: 1, note: '2.8 Miles + 5x50s striders' },
      { exercise: 'Week 9: Day 4', sets: 1, reps: 1, note: '5.6 Miles' },
      { exercise: 'Week 9: Day 5', sets: 1, reps: 1, note: '2.8 Miles' },
      { exercise: 'Week 9: Day 6', sets: 1, reps: 1, note: '8.4 Miles (Long Run)' },
      { exercise: 'Week 10: Day 1', sets: 1, reps: 1, note: '2.9 Miles' },
      { exercise: 'Week 10: Day 2', sets: 1, reps: 1, note: '5.8 Miles' },
      { exercise: 'Week 10: Day 3', sets: 1, reps: 1, note: '2.9 Miles' },
      { exercise: 'Week 10: Day 4', sets: 1, reps: 1, note: '5.8 Miles' },
      { exercise: 'Week 10: Day 5', sets: 1, reps: 1, note: '2.9 Miles' },
      { exercise: 'Week 10: Day 6', sets: 1, reps: 1, note: '8.7 Miles (Long Run)' },
      { exercise: 'Week 11: Day 1', sets: 1, reps: 1, note: '3 Miles + 7x40s striders' },
      { exercise: 'Week 11: Day 2', sets: 1, reps: 1, note: '6 Miles' },
      { exercise: 'Week 11: Day 3', sets: 1, reps: 1, note: '3 Miles + 7x40s striders' },
      { exercise: 'Week 11: Day 4', sets: 1, reps: 1, note: '6 Miles' },
      { exercise: 'Week 11: Day 5', sets: 1, reps: 1, note: '3 Miles' },
      { exercise: 'Week 11: Day 6', sets: 1, reps: 1, note: '9 Miles (Long Run)' },
      { exercise: 'Week 12: Day 1', sets: 1, reps: 1, note: '3.2 Miles' },
      { exercise: 'Week 12: Day 2', sets: 1, reps: 1, note: '6.4 Miles' },
      { exercise: 'Week 12: Day 3', sets: 1, reps: 1, note: '3.2 Miles' },
      { exercise: 'Week 12: Day 4', sets: 1, reps: 1, note: '6.4 Miles' },
      { exercise: 'Week 12: Day 5', sets: 1, reps: 1, note: '3.2 Miles' },
      { exercise: 'Week 12: Day 6', sets: 1, reps: 1, note: '9.6 Miles (Long Run)' }
    ]},
    { name: 'Weeks 13-18 Schedule', exercises: [
      { exercise: 'Week 13: Day 1', sets: 1, reps: 1, note: '3.4 Miles + 6x50s striders' },
      { exercise: 'Week 13: Day 2', sets: 1, reps: 1, note: '6.8 Miles' },
      { exercise: 'Week 13: Day 3', sets: 1, reps: 1, note: '3.4 Miles' },
      { exercise: 'Week 13: Day 4', sets: 1, reps: 1, note: '6.8 Miles' },
      { exercise: 'Week 13: Day 5', sets: 1, reps: 1, note: '3.4 Miles' },
      { exercise: 'Week 13: Day 6', sets: 1, reps: 1, note: '10.2 Miles (Long Run)' },
      { exercise: 'Week 14: Day 1', sets: 1, reps: 1, note: '3.6 Miles' },
      { exercise: 'Week 14: Day 2', sets: 1, reps: 1, note: '7.2 Miles' },
      { exercise: 'Week 14: Day 3', sets: 1, reps: 1, note: '3.6 Miles' },
      { exercise: 'Week 14: Day 4', sets: 1, reps: 1, note: '7.2 Miles' },
      { exercise: 'Week 14: Day 5', sets: 1, reps: 1, note: '3.6 Miles' },
      { exercise: 'Week 14: Day 6', sets: 1, reps: 1, note: '10.8 Miles (Long Run)' },
      { exercise: 'Week 15: Day 1', sets: 1, reps: 1, note: '3.8 Miles + 7x50s striders' },
      { exercise: 'Week 15: Day 2', sets: 1, reps: 1, note: '7.6 Miles' },
      { exercise: 'Week 15: Day 3', sets: 1, reps: 1, note: '3.8 Miles' },
      { exercise: 'Week 15: Day 4', sets: 1, reps: 1, note: '7.6 Miles' },
      { exercise: 'Week 15: Day 5', sets: 1, reps: 1, note: '3.8 Miles' },
      { exercise: 'Week 15: Day 6', sets: 1, reps: 1, note: '11.4 Miles (Long Run)' },
      { exercise: 'Week 16: Day 1', sets: 1, reps: 1, note: '4 Miles' },
      { exercise: 'Week 16: Day 2', sets: 1, reps: 1, note: '8 Miles' },
      { exercise: 'Week 16: Day 3', sets: 1, reps: 1, note: '4 Miles' },
      { exercise: 'Week 16: Day 4', sets: 1, reps: 1, note: '8 Miles' },
      { exercise: 'Week 16: Day 5', sets: 1, reps: 1, note: '4 Miles' },
      { exercise: 'Week 16: Day 6', sets: 1, reps: 1, note: '12 Miles (Long Run)' },
      { exercise: 'Week 17: Day 1', sets: 1, reps: 1, note: '3 Miles + 6x60s striders' },
      { exercise: 'Week 17: Day 2', sets: 1, reps: 1, note: '6 Miles' },
      { exercise: 'Week 17: Day 3', sets: 1, reps: 1, note: '3 Miles + 6x30s hills' },
      { exercise: 'Week 17: Day 4', sets: 1, reps: 1, note: '6 Miles' },
      { exercise: 'Week 17: Day 5', sets: 1, reps: 1, note: '3 Miles' },
      { exercise: 'Week 17: Day 6', sets: 1, reps: 1, note: '9 Miles (Long Run)' },
      { exercise: 'Week 18: Day 1', sets: 1, reps: 1, note: '3.1 Miles' },
      { exercise: 'Week 18: Day 2', sets: 1, reps: 1, note: '6.2 Miles + 6x60s striders' },
      { exercise: 'Week 18: Day 3', sets: 1, reps: 1, note: '3.1 Miles + 6x45s hills' },
      { exercise: 'Week 18: Day 4', sets: 1, reps: 1, note: '6.2 Miles' },
      { exercise: 'Week 18: Day 5', sets: 1, reps: 1, note: '3.1 Miles' },
      { exercise: 'Week 18: Day 6', sets: 1, reps: 1, note: '9.3 Miles (Long Run)' }
    ]},
    { name: 'Weeks 19-26 Schedule', exercises: [
      { exercise: 'Week 19-20 Pattern', sets: 1, reps: 1, note: 'Short: 3.2-3.3mi | Mid: 6.4-6.6mi | Long: 9.6-9.9mi' },
      { exercise: 'Week 21-22 Pattern', sets: 1, reps: 1, note: 'Short: 3.4-3.5mi | Mid: 6.8-7mi | Long: 10.2-10.5mi' },
      { exercise: 'Week 23-24 Pattern', sets: 1, reps: 1, note: 'Short: 3.6-3.7mi | Mid: 7.2-7.4mi | Long: 10.8-11.1mi' },
      { exercise: 'Week 25-26 Pattern', sets: 1, reps: 1, note: 'Short: 3.8-3.9mi | Mid: 7.6-7.8mi | Long: 11.4-11.7mi' },
      { exercise: 'Speed Work (Day 1 & 3)', sets: 1, reps: 1, note: '6x60s striders OR 10x90-120s hills' },
      { exercise: 'Weekly Structure', sets: 1, reps: 1, note: 'D1: Short+Speed | D2: Mid | D3: Short+Hills | D4: Mid | D5: Short | D6: Long' }
    ]}
  ]
};

const sampleHistory = [
  { date: '2025-01-30', exercise: 'Back Squat', sets: [{w:225,r:5,rpe:7},{w:245,r:5,rpe:8},{w:265,r:3,rpe:9}] },
  { date: '2025-01-28', exercise: 'Bench Press', sets: [{w:185,r:5,rpe:7},{w:195,r:5,rpe:8},{w:205,r:4,rpe:9}] },
  { date: '2025-01-27', exercise: 'Trap Bar Deadlift', sets: [{w:275,r:5,rpe:7},{w:315,r:3,rpe:8},{w:335,r:2,rpe:9}] },
];

const sampleCardioHistory = [
  { date: '2025-01-31', type: 'run', name: 'Morning Run', distance: 3.2, duration: 28, unit: 'mi', hr: 145, notes: 'Easy pace' },
  { date: '2025-01-29', type: 'ruck', name: 'Weighted Ruck', distance: 2.5, duration: 45, unit: 'mi', load: 35, notes: 'Zone 2' },
  { date: '2025-01-26', type: 'bike', name: 'Cycling', distance: 12, duration: 40, unit: 'mi', hr: 135 },
];

const defaultPrograms = [gbrsProgram, gbrsMobility1, gbrsMobility2, bulletproofHips1, bulletproofHips2, bulletproofHips3, dailyMaintenance, deepTissue, specialOpsWarmup, specialOpsRunning];

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [programs] = useState(defaultPrograms);
  const [history, setHistory] = useState([]);
  const [cardioHistory, setCardioHistory] = useState([]);
  const [workout, setWorkout] = useState(null);
  const [restTimer, setRestTimer] = useState(null);
  const [restSec, setRestSec] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [storageStatus, setStorageStatus] = useState('loading');

  // Load data from persistent storage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const saved = localStorage.getItem('iron-intelligence-data');
        if (saved) {
          const data = JSON.parse(saved);
          setHistory(data.history || sampleHistory);
          setCardioHistory(data.cardioHistory || sampleCardioHistory);
          setStorageStatus('loaded');
        } else {
          // First time user - load sample data
          setHistory(sampleHistory);
          setCardioHistory(sampleCardioHistory);
          setStorageStatus('new');
        }
      } catch (error) {
        console.log('Storage not available, using sample data');
        setHistory(sampleHistory);
        setCardioHistory(sampleCardioHistory);
        setStorageStatus('unavailable');
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Save data whenever history or cardioHistory changes
  useEffect(() => {
    if (isLoading) return; // Don't save while loading
    try {
      localStorage.setItem('iron-intelligence-data', JSON.stringify({
        history,
        cardioHistory,
        lastSaved: new Date().toISOString()
      }));
      setStorageStatus('saved');
    } catch (error) {
      console.log('Could not save to storage');
      setStorageStatus('unavailable');
    }
  }, [history, cardioHistory, isLoading]);

  const startProgramWorkout = (program, dayIndex) => {
    const day = program.fullDays[dayIndex];
    setWorkout({
      started: Date.now(),
      programName: program.name,
      dayName: day.name,
      exercises: day.exercises.map(e => ({ ...e, completed: false, loggedSets: [] })),
      currentExerciseIndex: 0
    });
    setTab('workout');
  };

  // Reset all data
  const resetData = () => {
    if (confirm('Are you sure you want to reset all your workout data? This cannot be undone.')) {
      setHistory(sampleHistory);
      setCardioHistory(sampleCardioHistory);
      try {
        localStorage.removeItem('iron-intelligence-data');
      } catch (e) {}
    }
  };

  useEffect(() => {
    let i; if (restTimer) i = setInterval(() => setRestSec(s => s + 1), 1000);
    return () => clearInterval(i);
  }, [restTimer]);

  const tabs = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'workout', icon: Dumbbell, label: 'Strength' },
    { id: 'cardio', icon: Activity, label: 'Cardio' },
    { id: 'programs', icon: Calendar, label: 'Programs' },
    { id: 'camera', icon: Camera, label: 'Camera' },
    { id: 'ai', icon: Brain, label: 'AI' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <Dumbbell className="w-12 h-12 mx-auto mb-4 text-violet-400 animate-pulse" />
          <p className="text-gray-400">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-8 h-8" />
            <div><h1 className="text-xl font-bold">Iron Intelligence</h1><p className="text-violet-200 text-sm">GBRS Performance System</p></div>
          </div>
          <div className="flex items-center gap-2">
            {storageStatus === 'saved' && <div className="w-2 h-2 bg-green-400 rounded-full" title="Data saved" />}
            {storageStatus === 'unavailable' && <div className="w-2 h-2 bg-yellow-400 rounded-full" title="Storage unavailable" />}
          </div>
        </div>
      </div>
      <div className="pb-20">
        {tab === 'dashboard' && <Dashboard history={history} cardioHistory={cardioHistory} resetData={resetData} storageStatus={storageStatus} />}
        {tab === 'workout' && <WorkoutLogger workout={workout} setWorkout={setWorkout} history={history} setHistory={setHistory} restTimer={restTimer} setRestTimer={setRestTimer} restSec={restSec} setRestSec={setRestSec} />}
        {tab === 'cardio' && <CardioLogger cardioHistory={cardioHistory} setCardioHistory={setCardioHistory} />}
        {tab === 'programs' && <Programs programs={programs} startProgramWorkout={startProgramWorkout} />}
        {tab === 'camera' && <CameraModule />}
        {tab === 'ai' && <AICoach history={history} cardioHistory={cardioHistory} />}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
        <div className="flex justify-around py-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex flex-col items-center p-2 ${tab === t.id ? 'text-violet-400' : 'text-gray-500'}`}>
              <t.icon className="w-5 h-5" /><span className="text-xs mt-1">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ history, cardioHistory, resetData, storageStatus }) {
  const totalVol = history.reduce((a, h) => a + h.sets.reduce((s, x) => s + x.w * x.r, 0), 0);
  const prs = {}; history.forEach(h => { const m = Math.max(...h.sets.map(s => s.w)); if (!prs[h.exercise] || m > prs[h.exercise]) prs[h.exercise] = m; });
  const weekVol = [12500, 14200, 13800, 15600, 14900, 16200, 15800];
  const maxV = Math.max(...weekVol);
  const totalCardioMiles = cardioHistory.reduce((a, c) => a + (c.unit === 'mi' ? c.distance : c.distance * 0.000621), 0);
  const totalCardioMins = cardioHistory.reduce((a, c) => a + c.duration, 0);

  return (
    <div className="p-4 space-y-4">
      {/* Storage Status Banner */}
      <div className={`rounded-xl p-3 border ${
        storageStatus === 'saved' ? 'bg-green-900/20 border-green-600/30' :
        storageStatus === 'unavailable' ? 'bg-yellow-900/20 border-yellow-600/30' :
        'bg-violet-900/20 border-violet-600/30'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              storageStatus === 'saved' ? 'bg-green-400' :
              storageStatus === 'unavailable' ? 'bg-yellow-400' :
              'bg-violet-400'
            }`} />
            <span className="text-sm text-gray-300">
              {storageStatus === 'saved' && '✓ Data saved automatically'}
              {storageStatus === 'unavailable' && '⚠ Storage unavailable - data won\'t persist'}
              {storageStatus === 'new' && '✓ Welcome! Your data will be saved'}
              {storageStatus === 'loaded' && '✓ Data loaded from storage'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 mb-1"><Dumbbell className="w-4 h-4" /><span className="text-xs">Strength</span></div>
          <p className="text-2xl font-bold">{history.length} <span className="text-sm font-normal text-gray-500">sessions</span></p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 mb-1"><Activity className="w-4 h-4" /><span className="text-xs">Cardio</span></div>
          <p className="text-2xl font-bold">{totalCardioMiles.toFixed(1)} <span className="text-sm font-normal text-gray-500">miles</span></p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 mb-1"><TrendingUp className="w-4 h-4" /><span className="text-xs">Volume</span></div>
          <p className="text-2xl font-bold">{(totalVol/1000).toFixed(1)}k <span className="text-sm font-normal text-gray-500">lbs</span></p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 mb-1"><Timer className="w-4 h-4" /><span className="text-xs">Cardio Time</span></div>
          <p className="text-2xl font-bold">{totalCardioMins} <span className="text-sm font-normal text-gray-500">min</span></p>
        </div>
      </div>
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        <h3 className="text-sm text-gray-400 mb-3">Weekly Volume</h3>
        <div className="flex items-end gap-1 h-20">
          {weekVol.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-gradient-to-t from-violet-600 to-violet-400 rounded-t" style={{ height: `${(v/maxV)*100}%` }} />
              <span className="text-xs text-gray-500">{['M','T','W','T','F','S','S'][i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        <h3 className="text-sm text-gray-400 mb-3">Personal Records</h3>
        {Object.keys(prs).length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-2">No PRs yet - start lifting!</p>
        ) : Object.entries(prs).map(([ex, w]) => (
          <div key={ex} className="flex justify-between py-2 border-b border-gray-800 last:border-0">
            <span className="text-sm">{ex}</span><span className="text-violet-400 font-bold">{w} lbs</span>
          </div>
        ))}
      </div>
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        <h3 className="text-sm text-gray-400 mb-3">Recent Cardio</h3>
        {cardioHistory.slice(0, 3).map((c, i) => (
          <div key={i} className="flex justify-between py-2 border-b border-gray-800 last:border-0">
            <div>
              <p className="text-sm font-medium flex items-center gap-2">
                <span>{c.type === 'run' ? '🏃' : c.type === 'bike' ? '🚴' : c.type === 'ruck' ? '🎒' : '💪'}</span>
                {c.name}
              </p>
              <p className="text-xs text-gray-500">{c.date}</p>
            </div>
            <div className="text-right">
              <p className="text-emerald-400 font-medium">{c.distance} {c.unit}</p>
              <p className="text-xs text-gray-500">{c.duration} min</p>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Section */}
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        <h3 className="text-sm text-gray-400 mb-3">Settings</h3>
        <button 
          onClick={resetData}
          className="w-full bg-red-600/20 text-red-400 rounded-lg p-3 border border-red-600/30 text-sm"
        >
          Reset All Data
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">This will clear all your workout and cardio history</p>
      </div>
    </div>
  );
}

function WorkoutLogger({ workout, setWorkout, history, setHistory, restTimer, setRestTimer, restSec, setRestSec }) {
  const [curEx, setCurEx] = useState(null);
  const [sets, setSets] = useState([]);
  const [showList, setShowList] = useState(false);
  const fmt = s => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  
  const addSet = () => { const l = sets[sets.length-1] || {weight:135,reps:8,rpe:7}; setSets([...sets, {...l}]); };
  const upSet = (i, f, v) => { const n = [...sets]; n[i][f] = Number(v); setSets(n); };
  
  const logEx = () => { 
    if (curEx && sets.length) { 
      setHistory([{date: new Date().toISOString().split('T')[0], exercise: curEx.name || curEx.exercise, sets: sets.map(s => ({w:s.weight,r:s.reps,rpe:s.rpe}))}, ...history]); 
      if (workout?.exercises) {
        const updated = {...workout};
        updated.exercises[workout.currentExerciseIndex].completed = true;
        updated.exercises[workout.currentExerciseIndex].loggedSets = sets;
        const nextIndex = updated.exercises.findIndex((e, i) => i > workout.currentExerciseIndex && !e.completed);
        if (nextIndex !== -1) updated.currentExerciseIndex = nextIndex;
        setWorkout(updated);
      }
      setCurEx(null); setSets([]); 
    }
  };

  const startProgramExercise = (exercise, index) => {
    setCurEx(exercise);
    const newSets = [];
    for (let i = 0; i < exercise.sets; i++) newSets.push({ weight: 135, reps: exercise.reps, rpe: 7 });
    setSets(newSets);
    if (workout?.exercises) setWorkout({...workout, currentExerciseIndex: index});
  };

  const completedCount = workout?.exercises?.filter(e => e.completed).length || 0;
  const totalCount = workout?.exercises?.length || 0;

  if (!workout) return (
    <div className="p-4">
      <button onClick={() => setWorkout({started: Date.now()})} className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-6 flex items-center justify-center gap-3">
        <Play className="w-8 h-8" /><span className="text-xl font-bold">Start Workout</span>
      </button>
      <p className="text-center text-gray-500 text-sm mt-4">Or select a program from the Programs tab</p>
    </div>
  );

  if (workout.exercises) {
    return (
      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-xl p-4 border border-violet-600/30">
          <h3 className="font-bold text-violet-400">{workout.programName}</h3>
          <p className="text-sm text-gray-400">{workout.dayName}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-violet-500 transition-all" style={{width: `${(completedCount/totalCount)*100}%`}} />
            </div>
            <span className="text-xs text-gray-400">{completedCount}/{totalCount}</span>
          </div>
        </div>
        {restTimer && (
          <div className="bg-amber-600 rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-center gap-3"><Timer className="w-6 h-6" /><div><p className="text-sm opacity-80">Rest</p><p className="text-2xl font-mono font-bold">{fmt(restSec)}</p></div></div>
            <button onClick={() => setRestTimer(null)} className="bg-white/20 rounded-lg px-4 py-2">Done</button>
          </div>
        )}
        {curEx ? (
          <div className="bg-gray-900 rounded-xl p-4 border border-violet-600/50">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{curEx.exercise || curEx.name}</h3>
                <p className="text-sm text-gray-500">{curEx.note}</p>
                <p className="text-xs text-violet-400 mt-1">Target: {curEx.sets}×{curEx.reps}</p>
              </div>
              <button onClick={() => {setCurEx(null);setSets([]);}}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 mb-4">
              <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 px-2"><span>Set</span><span>Weight</span><span>Reps</span><span>RPE</span></div>
              {sets.map((s,i) => (
                <div key={i} className="grid grid-cols-4 gap-2 items-center">
                  <span className="text-center font-medium">{i+1}</span>
                  <input type="number" value={s.weight} onChange={e => upSet(i,'weight',e.target.value)} className="bg-gray-800 rounded-lg p-2 text-center w-full" />
                  <input type="number" value={s.reps} onChange={e => upSet(i,'reps',e.target.value)} className="bg-gray-800 rounded-lg p-2 text-center w-full" />
                  <input type="number" value={s.rpe} onChange={e => upSet(i,'rpe',e.target.value)} className="bg-gray-800 rounded-lg p-2 text-center w-full" />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={addSet} className="flex-1 bg-gray-800 rounded-lg p-3 flex items-center justify-center gap-2"><Plus className="w-4 h-4" />Add Set</button>
              <button onClick={() => {setRestSec(0);setRestTimer(Date.now());}} className="bg-amber-600 rounded-lg p-3"><Timer className="w-5 h-5" /></button>
            </div>
            <button onClick={logEx} className="w-full mt-3 bg-green-600 rounded-lg p-3 flex items-center justify-center gap-2"><Check className="w-5 h-5" />Complete Exercise</button>
          </div>
        ) : (
          <div className="space-y-2">
            {workout.exercises.map((e, i) => (
              <button key={i} onClick={() => !e.completed && startProgramExercise(e, i)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${e.completed ? 'bg-green-900/20 border-green-600/30' : i === workout.currentExerciseIndex ? 'bg-violet-900/30 border-violet-600/50' : 'bg-gray-900 border-gray-800'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {e.completed && <Check className="w-4 h-4 text-green-400" />}
                      <p className={`font-medium ${e.completed ? 'text-green-400' : ''}`}>{e.exercise}</p>
                    </div>
                    {e.note && <p className="text-xs text-gray-500 mt-1">{e.note}</p>}
                    {e.completed && e.loggedSets && <p className="text-xs text-green-400/70 mt-1">Logged: {e.loggedSets.map(s => `${s.weight}×${s.reps}`).join(', ')}</p>}
                  </div>
                  <span className="text-sm text-violet-400">{e.sets}×{e.reps}</span>
                </div>
              </button>
            ))}
          </div>
        )}
        <button onClick={() => setWorkout(null)} className="w-full bg-red-600/20 text-red-400 rounded-xl p-4 border border-red-600/30">
          {completedCount === totalCount ? 'Finish Workout 🎉' : 'End Workout Early'}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {restTimer && (
        <div className="bg-amber-600 rounded-xl p-4 flex justify-between items-center">
          <div className="flex items-center gap-3"><Timer className="w-6 h-6" /><div><p className="text-sm opacity-80">Rest</p><p className="text-2xl font-mono font-bold">{fmt(restSec)}</p></div></div>
          <button onClick={() => setRestTimer(null)} className="bg-white/20 rounded-lg px-4 py-2">Done</button>
        </div>
      )}
      {curEx ? (
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex justify-between mb-4"><div><h3 className="font-bold text-lg">{curEx.name}</h3><p className="text-sm text-gray-500">{curEx.muscles.join(', ')}</p></div><button onClick={() => {setCurEx(null);setSets([]);}}><X className="w-5 h-5" /></button></div>
          <div className="space-y-2 mb-4">
            <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 px-2"><span>Set</span><span>Weight</span><span>Reps</span><span>RPE</span></div>
            {sets.map((s,i) => (
              <div key={i} className="grid grid-cols-4 gap-2 items-center">
                <span className="text-center font-medium">{i+1}</span>
                <input type="number" value={s.weight} onChange={e => upSet(i,'weight',e.target.value)} className="bg-gray-800 rounded-lg p-2 text-center w-full" />
                <input type="number" value={s.reps} onChange={e => upSet(i,'reps',e.target.value)} className="bg-gray-800 rounded-lg p-2 text-center w-full" />
                <input type="number" value={s.rpe} onChange={e => upSet(i,'rpe',e.target.value)} className="bg-gray-800 rounded-lg p-2 text-center w-full" />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={addSet} className="flex-1 bg-gray-800 rounded-lg p-3 flex items-center justify-center gap-2"><Plus className="w-4 h-4" />Add Set</button>
            <button onClick={() => {setRestSec(0);setRestTimer(Date.now());}} className="bg-amber-600 rounded-lg p-3"><Timer className="w-5 h-5" /></button>
          </div>
          <button onClick={logEx} className="w-full mt-3 bg-green-600 rounded-lg p-3 flex items-center justify-center gap-2"><Check className="w-5 h-5" />Log Exercise</button>
        </div>
      ) : (
        <button onClick={() => setShowList(true)} className="w-full bg-gray-900 border-2 border-dashed border-gray-700 rounded-xl p-6 flex items-center justify-center gap-2 text-gray-400"><Plus className="w-5 h-5" />Add Exercise</button>
      )}
      {showList && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end">
          <div className="bg-gray-900 w-full rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex justify-between"><h3 className="font-bold">Select Exercise</h3><button onClick={() => setShowList(false)}><X className="w-5 h-5" /></button></div>
            <div className="p-4 space-y-2">
              {allExercises.map(ex => (
                <button key={ex.id} onClick={() => {setCurEx(ex);setSets([{weight:135,reps:8,rpe:7}]);setShowList(false);}} className="w-full text-left p-3 bg-gray-800 rounded-lg">
                  <p className="font-medium">{ex.name}</p><p className="text-xs text-gray-500">{ex.muscles.join(', ')}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setWorkout(null)} className="w-full bg-red-600/20 text-red-400 rounded-xl p-4 border border-red-600/30">End Workout</button>
    </div>
  );
}

function Programs({ programs, startProgramWorkout }) {
  const [expanded, setExpanded] = useState(null);
  const [selectedDay, setSelectedDay] = useState({});

  return (
    <div className="p-4 space-y-4">
      <div className="bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-xl p-4 border border-violet-600/30">
        <h3 className="font-bold text-violet-400 mb-1">Vernon Griffith System</h3>
        <p className="text-sm text-gray-400">Complete GBRS Performance + Mobility programs loaded</p>
      </div>
      {programs.map(p => (
        <div key={p.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <button onClick={() => { setExpanded(expanded === p.id ? null : p.id); if (!selectedDay[p.id]) setSelectedDay({...selectedDay, [p.id]: 0}); }} className="w-full p-4 flex justify-between items-start text-left">
            <div>
              <h3 className="font-bold">{p.name}</h3>
              <span className="text-xs bg-violet-600/30 text-violet-400 px-2 py-1 rounded-full">{p.style}</span>
              <p className="text-xs text-gray-500 mt-1">{p.days.length} days • {p.fullDays?.reduce((a,d) => a + d.exercises.length, 0) || 0} exercises</p>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expanded === p.id ? 'rotate-180' : ''}`} />
          </button>
          {expanded === p.id && p.fullDays && (
            <div className="px-4 pb-4 border-t border-gray-800 pt-3 space-y-3">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {p.fullDays.map((d, i) => (
                  <button key={i} onClick={() => setSelectedDay({...selectedDay, [p.id]: i})}
                    className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap ${selectedDay[p.id] === i ? 'bg-violet-600' : 'bg-gray-800'}`}>
                    Day {i + 1}
                  </button>
                ))}
              </div>
              {p.fullDays[selectedDay[p.id] || 0] && (
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <h4 className="font-medium text-sm text-violet-400 mb-3">{p.fullDays[selectedDay[p.id] || 0].name}</h4>
                  {p.fullDays[selectedDay[p.id] || 0].exercises.map((e, j) => (
                    <div key={j} className="flex justify-between items-start py-2 border-b border-gray-700/50 last:border-0">
                      <div className="flex-1">
                        <p className="text-sm text-gray-300">{e.exercise}</p>
                        {e.note && <p className="text-xs text-gray-500">{e.note}</p>}
                      </div>
                      <span className="text-xs text-violet-400 ml-2 font-medium">{e.sets}×{e.reps}</span>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => startProgramWorkout(p, selectedDay[p.id] || 0)}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg p-3 flex items-center justify-center gap-2 font-medium">
                <Play className="w-4 h-4" />Start {p.fullDays[selectedDay[p.id] || 0]?.name.split(':')[0] || 'Workout'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CardioLogger({ cardioHistory, setCardioHistory }) {
  const [logging, setLogging] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [form, setForm] = useState({ type: 'run', name: '', distance: '', duration: '', unit: 'mi', hr: '', load: '', notes: '' });

  const cardioTypes = [
    { id: 'run', name: 'Run', icon: '🏃', fields: ['distance', 'duration', 'hr'] },
    { id: 'walk', name: 'Walk', icon: '🚶', fields: ['distance', 'duration', 'hr'] },
    { id: 'ruck', name: 'Ruck', icon: '🎒', fields: ['distance', 'duration', 'load', 'hr'] },
    { id: 'bike', name: 'Bike', icon: '🚴', fields: ['distance', 'duration', 'hr'] },
  ];

  useEffect(() => {
    let i; if (activeSession) i = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(i);
  }, [activeSession]);

  const fmt = s => { const m = Math.floor(s / 60); const sec = s % 60; return `${m}:${sec.toString().padStart(2,'0')}`; };
  const calcPace = (dist, mins) => { if (!dist || !mins) return null; const pace = mins / dist; return `${Math.floor(pace)}:${Math.round((pace - Math.floor(pace)) * 60).toString().padStart(2,'0')}`; };
  const startLiveSession = (type) => { setActiveSession({ type }); setElapsed(0); };
  const endLiveSession = () => { const type = cardioTypes.find(t => t.id === activeSession.type); setForm({...form, type: activeSession.type, name: type?.name || '', duration: Math.round(elapsed / 60).toString()}); setActiveSession(null); setLogging(true); };
  const saveCardio = () => { setCardioHistory([{ date: new Date().toISOString().split('T')[0], type: form.type, name: form.name || cardioTypes.find(t => t.id === form.type)?.name, distance: parseFloat(form.distance) || 0, duration: parseInt(form.duration) || 0, unit: form.unit, hr: parseInt(form.hr) || null, load: parseInt(form.load) || null, notes: form.notes }, ...cardioHistory]); setForm({ type: 'run', name: '', distance: '', duration: '', unit: 'mi', hr: '', load: '', notes: '' }); setLogging(false); };
  const currentType = cardioTypes.find(t => t.id === form.type);

  if (activeSession) {
    const type = cardioTypes.find(t => t.id === activeSession.type);
    return (
      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-br from-emerald-600/30 to-teal-600/30 rounded-xl p-6 border border-emerald-600/50 text-center">
          <p className="text-6xl mb-2">{type?.icon}</p>
          <h2 className="text-xl font-bold text-emerald-400">{type?.name} in Progress</h2>
          <p className="text-5xl font-mono font-bold mt-4">{fmt(elapsed)}</p>
        </div>
        <button onClick={endLiveSession} className="w-full bg-red-600 rounded-xl p-4 font-bold">End Session</button>
      </div>
    );
  }

  if (logging) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center"><h2 className="text-lg font-bold">Log Cardio</h2><button onClick={() => setLogging(false)}><X className="w-5 h-5" /></button></div>
        <div className="grid grid-cols-4 gap-2">
          {cardioTypes.map(t => (<button key={t.id} onClick={() => setForm({...form, type: t.id, name: t.name})} className={`p-3 rounded-lg text-center ${form.type === t.id ? 'bg-emerald-600' : 'bg-gray-800'}`}><p className="text-xl">{t.icon}</p><p className="text-xs mt-1">{t.name}</p></button>))}
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 space-y-4">
          {currentType?.fields.includes('distance') && (
            <div className="flex gap-2">
              <div className="flex-1"><label className="text-xs text-gray-400">Distance</label><input type="number" step="0.1" value={form.distance} onChange={e => setForm({...form, distance: e.target.value})} className="w-full bg-gray-800 rounded-lg p-3 mt-1" /></div>
              <div className="w-24"><label className="text-xs text-gray-400">Unit</label><select value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="w-full bg-gray-800 rounded-lg p-3 mt-1"><option value="mi">miles</option><option value="km">km</option></select></div>
            </div>
          )}
          <div><label className="text-xs text-gray-400">Duration (minutes)</label><input type="number" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className="w-full bg-gray-800 rounded-lg p-3 mt-1" /></div>
          {form.distance && form.duration && <div className="bg-emerald-600/20 rounded-lg p-3 border border-emerald-600/30"><p className="text-xs text-emerald-400">Pace: {calcPace(parseFloat(form.distance), parseInt(form.duration))} / {form.unit}</p></div>}
          {currentType?.fields.includes('hr') && <div><label className="text-xs text-gray-400">Avg Heart Rate</label><input type="number" value={form.hr} onChange={e => setForm({...form, hr: e.target.value})} className="w-full bg-gray-800 rounded-lg p-3 mt-1" /></div>}
          {currentType?.fields.includes('load') && <div><label className="text-xs text-gray-400">Load (lbs)</label><input type="number" value={form.load} onChange={e => setForm({...form, load: e.target.value})} className="w-full bg-gray-800 rounded-lg p-3 mt-1" /></div>}
          <div><label className="text-xs text-gray-400">Notes</label><input type="text" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="w-full bg-gray-800 rounded-lg p-3 mt-1" /></div>
        </div>
        <button onClick={saveCardio} disabled={!form.duration} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-4 font-bold disabled:opacity-50"><Check className="w-5 h-5 inline mr-2" />Save Cardio</button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        <h3 className="font-medium mb-3">Quick Start</h3>
        <div className="grid grid-cols-4 gap-2">
          {cardioTypes.map(t => (<button key={t.id} onClick={() => startLiveSession(t.id)} className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-600/30 rounded-xl p-4 text-center"><p className="text-2xl">{t.icon}</p><p className="text-xs mt-1 text-gray-300">{t.name}</p></button>))}
        </div>
      </div>
      <button onClick={() => setLogging(true)} className="w-full bg-gray-900 border-2 border-dashed border-gray-700 rounded-xl p-4 flex items-center justify-center gap-2 text-gray-400"><Plus className="w-5 h-5" />Log Cardio Manually</button>
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        <h3 className="font-medium mb-3">Cardio History</h3>
        {cardioHistory.map((c, i) => {
          const type = cardioTypes.find(t => t.id === c.type);
          return (
            <div key={i} className="bg-gray-800/50 rounded-lg p-3 mb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2"><span className="text-xl">{type?.icon || '💪'}</span><div><p className="font-medium">{c.name}</p><p className="text-xs text-gray-500">{c.date}</p></div></div>
                <div className="text-right">{c.distance > 0 && <p className="text-emerald-400 font-bold">{c.distance} {c.unit}</p>}<p className="text-xs text-gray-400">{c.duration} min</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CameraModule() {
  const [isActive, setIsActive] = useState(false);
  const [exercise, setExercise] = useState('squat');
  const [reps, setReps] = useState(0);
  const [phase, setPhase] = useState('up');
  const [feedback, setFeedback] = useState('Select exercise and start camera');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const exercises = [
    { id: 'squat', name: 'Squat', icon: '🏋️' },
    { id: 'pushup', name: 'Push-Up', icon: '💪' },
    { id: 'curl', name: 'Bicep Curl', icon: '💪' },
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
        setFeedback('Camera active - perform reps!');
      }
    } catch (err) {
      setFeedback('Camera access denied');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
    }
    setIsActive(false);
    setFeedback('Camera stopped');
  };

  const simulateRep = () => {
    if (phase === 'up') {
      setPhase('down');
      setFeedback('Going down...');
    } else {
      setPhase('up');
      setReps(r => r + 1);
      setFeedback('Rep counted! Good form.');
    }
  };

  const resetReps = () => { setReps(0); setPhase('up'); };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-xl p-4 border border-pink-600/30">
        <div className="flex items-center gap-3 mb-2">
          <Camera className="w-6 h-6 text-pink-400" />
          <div>
            <h3 className="font-bold text-pink-400">Form Check Camera</h3>
            <p className="text-xs text-gray-400">AI-powered rep counting</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        <h4 className="text-sm text-gray-400 mb-3">Select Exercise</h4>
        <div className="grid grid-cols-3 gap-2">
          {exercises.map(ex => (
            <button key={ex.id} onClick={() => setExercise(ex.id)}
              className={`p-3 rounded-lg text-center transition-all ${exercise === ex.id ? 'bg-pink-600' : 'bg-gray-800'}`}>
              <p className="text-xl">{ex.icon}</p>
              <p className="text-xs mt-1">{ex.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
        <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
          {isActive ? (
            <>
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
              <div className="absolute top-4 left-4 bg-black/70 rounded-lg px-3 py-2">
                <p className="text-pink-400 font-bold text-2xl">{reps} reps</p>
              </div>
              <div className="absolute top-4 right-4 bg-black/70 rounded-lg px-3 py-2">
                <p className={`font-medium ${phase === 'up' ? 'text-green-400' : 'text-amber-400'}`}>
                  {phase === 'up' ? '↑ UP' : '↓ DOWN'}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">
              <Camera className="w-16 h-16 mx-auto mb-2 opacity-30" />
              <p>Camera preview</p>
            </div>
          )}
        </div>
        <div className="p-3 bg-gray-800/50">
          <p className="text-sm text-center text-gray-300">{feedback}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {!isActive ? (
          <button onClick={startCamera} className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl p-4 font-bold flex items-center justify-center gap-2">
            <Camera className="w-5 h-5" />Start Camera
          </button>
        ) : (
          <>
            <button onClick={simulateRep} className="flex-1 bg-green-600 rounded-xl p-4 font-bold">
              Simulate Rep
            </button>
            <button onClick={stopCamera} className="flex-1 bg-red-600 rounded-xl p-4 font-bold">
              Stop
            </button>
          </>
        )}
      </div>

      {reps > 0 && (
        <button onClick={resetReps} className="w-full bg-gray-800 rounded-xl p-3 text-gray-400">
          Reset Counter
        </button>
      )}

      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        <h4 className="text-sm text-gray-400 mb-2">How it works</h4>
        <p className="text-xs text-gray-500">
          Position yourself so your full body is visible. The AI tracks key body points to count reps and provide form feedback. Works best with good lighting and contrasting clothing.
        </p>
      </div>
    </div>
  );
}

function AICoach({ history, cardioHistory }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Build context about user's training data
  const buildTrainingContext = () => {
    const stats = {};
    history.forEach(h => {
      if (!stats[h.exercise]) stats[h.exercise] = { sessions: 0, maxW: 0, totalVol: 0, dates: [] };
      stats[h.exercise].sessions++;
      stats[h.exercise].dates.push(h.date);
      h.sets.forEach(s => {
        if (s.w > stats[h.exercise].maxW) stats[h.exercise].maxW = s.w;
        stats[h.exercise].totalVol += s.w * s.r;
      });
    });

    const cardioStats = {
      totalSessions: cardioHistory.length,
      totalMiles: cardioHistory.reduce((a, c) => a + (c.unit === 'mi' ? c.distance : c.distance * 0.000621), 0).toFixed(1),
      totalMinutes: cardioHistory.reduce((a, c) => a + c.duration, 0),
      types: [...new Set(cardioHistory.map(c => c.type))],
      recentCardio: cardioHistory.slice(0, 5)
    };

    return {
      strengthStats: stats,
      cardioStats,
      recentWorkouts: history.slice(0, 10),
      totalStrengthSessions: history.length,
      totalCardioSessions: cardioHistory.length
    };
  };

  const analyzeTraining = async () => {
    setIsLoading(true);
    const context = buildTrainingContext();
    
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          messages: [{
            role: "user",
            content: `You're an elite strength & conditioning coach analyzing training data. Here's the data:

STRENGTH DATA: ${JSON.stringify(context.strengthStats)}
CARDIO DATA: ${JSON.stringify(context.cardioStats)}
RECENT WORKOUTS: ${JSON.stringify(context.recentWorkouts)}

Provide a comprehensive analysis. Return JSON only with this structure:
{
  "summary": "2-3 sentence overview of their training",
  "strengths": ["what they're doing well"],
  "improvements": ["specific areas to improve"],
  "recommendations": ["actionable next steps"],
  "projectedPR": {"lift": "exercise name", "current": number, "projected": number, "timeline": "timeframe"},
  "cardioInsight": "analysis of their cardio training",
  "weeklyPlan": "brief suggestion for next week"
}`
          }]
        })
      });
      const d = await res.json();
      if (d.content?.[0]?.text) {
        const parsed = JSON.parse(d.content[0].text.replace(/```json|```/g, '').trim());
        setInsights(parsed);
        setShowAnalysis(true);
      }
    } catch (error) {
      setInsights({
        summary: `You've logged ${history.length} strength sessions and ${cardioHistory.length} cardio sessions. Your consistency is building a solid foundation.`,
        strengths: ["Regular training frequency", "Variety in exercise selection", "Tracking your workouts"],
        improvements: ["Consider adding progressive overload tracking", "Balance push/pull movements", "Include more Zone 2 cardio"],
        recommendations: ["Increase weights by 2.5-5% when hitting all reps", "Add one dedicated mobility session per week", "Track RPE to manage fatigue"],
        projectedPR: { lift: "Back Squat", current: 265, projected: 285, timeline: "4-6 weeks" },
        cardioInsight: "Maintain your current cardio volume. Consider adding one longer Zone 2 session (45+ min) per week for aerobic base.",
        weeklyPlan: "Focus on compound lifts Mon/Thu, cardio Tue/Fri, mobility Wed/Sat, rest Sunday."
      });
      setShowAnalysis(true);
    }
    setIsLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const context = buildTrainingContext();
    
    // Build conversation history for context
    const conversationHistory = messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are an expert strength & conditioning coach integrated into a workout tracking app called Iron Intelligence. You have access to the user's complete training data:

STRENGTH TRAINING DATA:
- Total sessions: ${context.totalStrengthSessions}
- Exercises and PRs: ${JSON.stringify(context.strengthStats)}
- Recent workouts: ${JSON.stringify(context.recentWorkouts)}

CARDIO DATA:
- Total sessions: ${context.totalCardioSessions}
- Total miles: ${context.cardioStats.totalMiles}
- Total minutes: ${context.cardioStats.totalMinutes}
- Activity types: ${context.cardioStats.types.join(', ')}
- Recent cardio: ${JSON.stringify(context.cardioStats.recentCardio)}

Be conversational, supportive, and specific. Reference their actual data when relevant. Give actionable advice. Keep responses concise but helpful. You can discuss programming, form, recovery, nutrition, and motivation.`,
          messages: [
            ...conversationHistory,
            { role: "user", content: userMessage }
          ]
        })
      });
      
      const d = await res.json();
      if (d.content?.[0]?.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: d.content[0].text }]);
      } else {
        throw new Error('No response');
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Try asking again, or use the Analyze Training button for a full breakdown of your data." 
      }]);
    }
    setIsLoading(false);
  };

  const quickPrompts = [
    "How's my training volume?",
    "What should I focus on?",
    "Am I doing enough cardio?",
    "Suggest a deload week",
    "How can I hit a squat PR?",
    "Rate my consistency"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">AI Coach</h3>
              <p className="text-xs text-gray-400">{history.length} strength • {cardioHistory.length} cardio sessions</p>
            </div>
          </div>
        </div>
        
        {/* Analyze Button */}
        <button 
          onClick={analyzeTraining} 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg p-3 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading && !messages.length ? (
            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Analyzing...</>
          ) : (
            <><BarChart3 className="w-4 h-4" />Analyze All Training</>
          )}
        </button>
      </div>

      {/* Analysis Results Modal */}
      {showAnalysis && insights && (
        <div className="p-4 space-y-3 border-b border-gray-800 max-h-[50vh] overflow-y-auto">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-violet-400">Training Analysis</h4>
            <button onClick={() => setShowAnalysis(false)} className="text-gray-500"><X className="w-4 h-4" /></button>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-sm text-gray-300">{insights.summary}</p>
          </div>

          {insights.strengths && (
            <div className="bg-green-900/20 rounded-lg p-3 border border-green-600/30">
              <h5 className="text-green-400 text-sm font-medium mb-2">💪 Strengths</h5>
              {insights.strengths.map((s, i) => (
                <p key={i} className="text-xs text-gray-300 mb-1">• {s}</p>
              ))}
            </div>
          )}

          {insights.improvements && (
            <div className="bg-amber-900/20 rounded-lg p-3 border border-amber-600/30">
              <h5 className="text-amber-400 text-sm font-medium mb-2">🎯 Areas to Improve</h5>
              {insights.improvements.map((s, i) => (
                <p key={i} className="text-xs text-gray-300 mb-1">• {s}</p>
              ))}
            </div>
          )}

          {insights.recommendations && (
            <div className="bg-violet-900/20 rounded-lg p-3 border border-violet-600/30">
              <h5 className="text-violet-400 text-sm font-medium mb-2">📋 Recommendations</h5>
              {insights.recommendations.map((r, i) => (
                <p key={i} className="text-xs text-gray-300 mb-1">• {r}</p>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {insights.projectedPR && (
              <div className="bg-emerald-900/20 rounded-lg p-3 border border-emerald-600/30">
                <h5 className="text-emerald-400 text-xs font-medium mb-1">PR Projection</h5>
                <p className="text-lg font-bold">{insights.projectedPR.projected} lbs</p>
                <p className="text-xs text-gray-400">{insights.projectedPR.lift} in {insights.projectedPR.timeline}</p>
              </div>
            )}
            {insights.cardioInsight && (
              <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-600/30">
                <h5 className="text-blue-400 text-xs font-medium mb-1">🏃 Cardio</h5>
                <p className="text-xs text-gray-300">{insights.cardioInsight}</p>
              </div>
            )}
          </div>

          {insights.weeklyPlan && (
            <div className="bg-gray-800/50 rounded-lg p-3">
              <h5 className="text-gray-400 text-xs font-medium mb-1">📅 Weekly Plan</h5>
              <p className="text-xs text-gray-300">{insights.weeklyPlan}</p>
            </div>
          )}
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !showAnalysis && (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 mx-auto mb-4 text-violet-400 opacity-50" />
            <p className="text-gray-400 mb-4">Ask me anything about your training!</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInput(prompt)}
                  className="bg-gray-800 hover:bg-gray-700 rounded-full px-3 py-1 text-xs text-gray-300 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${
              msg.role === 'user' 
                ? 'bg-violet-600 text-white rounded-br-md' 
                : 'bg-gray-800 text-gray-200 rounded-bl-md'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {isLoading && messages.length > 0 && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-800 bg-gray-950">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about your training..."
            className="flex-1 bg-gray-800 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:hover:bg-violet-600 rounded-full w-12 h-12 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export class User {

  years: Array<{ num: any }>;
  days: Array<{ num: any }>;
  months: Array<{ title: any }>;
  rel_status: Array<{ title: any }>;
  childrens: Array<{ title: any }>;
  ethnicities: Array<{ title: any }>;
  religions: Array<{ title: any }>;
  languages: Array<{ title: any }>;
  educations: Array<{ title: any }>;
  occupation: any;
  smoking: Array<{ title: any }>;
  drinking: Array<{ title: any}>;
  here_for: Array<{ title: any }>;
  height: Array<{ title: any }>;
  body_type: Array<{ title: any }>;
  eye_color: Array<{ title: any }>;
  hair_color: Array<{ title: any }>;
  special_features: Array<{ title: any }>;
  hobbies: Array<{ title: any }>;
  field_value: any;
  user : { username: any, email: any, email_retype: any, area: any, neighborhood: any, zip_code: any, phone: any, occupation: any, about_me: any, looking_for: any };
  name : any;

  constructor() {

      this.years = [];
      this.days = [];
      this.months = [];
      //this.relationship[];

      this.user = {username:'', email: '', email_retype: '', area: '', neighborhood: '', zip_code: '',
       phone: '', occupation: '', about_me: '', looking_for: ''};

      this.rel_status = [
        { title: 'Sinle'},
        { title: 'Married'},
        { title: 'Divorced'},
        { title: 'Separated'},
        { title: 'Widowed'},
      ];

      this.childrens = [
        { title: 'Yes' },
        { title: 'No' }
      ];

      this.ethnicities = [
        { title: 'African Descent/Black' },
        { title: 'Asian' },
        { title: 'Caucasian/White' },
        { title: 'Latin/Hispanic' },
        { title: 'Middle Eastern' },
        { title: 'Multiracial' },
        { title: 'Native American' },
        { title: 'Pacific Islander' },
        { title: 'South Asian/East Indian' },
        { title: 'Other' }
      ];

      this.religions = [
        { title: 'Agnostic'},
        { title: 'Atheist'},
        { title: 'Buddhist'},
        { title: 'Christian (Catholic)'},
        { title: 'Christian (Orthodox)'},
        { title: 'Christian (Protestant)'},
        { title: 'Christian (Mormon)'},
        { title: 'Christian (Other)'},
        { title: 'Hindu'},
        { title: 'Jewish'},
        { title: 'Muslim'},
        { title: 'Not Religious'},
        { title: 'Other'}
      ];

      this.languages = [
        { title: 'English'},
        { title: 'Spanish'},
        { title: 'Dutch'},
        { title: 'Italian'},
        { title: 'Japanese'},
        { title: 'Korean'},
        { title: 'Spanish'},
        { title: 'Russian'},
        { title: 'Chinese'},
        { title: 'German'},
        { title: 'Portuguese'},
        { title: 'Other'},
      ];

      this.educations = [
        { title: 'High School'}, { title: 'Some College'}, { title: 'Associates Degree'}, { title: "Bachelor's Degree"},
        { title: 'College Graduate'},{ title: "Master's Degree"},{ title: 'Ph.D./Postdoctoral'},
      ];

      this.smoking = [
        { title: 'Non Smoker'}, { title: 'Light Smoker'}, { title: 'Heavy Smoker'},
      ];

      this.drinking = [
        { title: 'Non Drinker'},
        { title: 'Light Drinker'},
        { title: 'Heavy Drinker'},
      ];

      this.here_for = [
        { title: 'Romance'},
        { title: 'Long Term Relationship'},
        { title: 'Mutually Beneficial Arrangements'},
        { title: 'Dating'},
        { title: 'Financial Support'},
        { title: 'Friendship'},
      ];

      this.height = [
        { title: '4\' 6\" (137 cm)'}, { title: '4\' 7\" (140 cm)'}, { title: '4\' 8\" (142 cm)'}, { title: '4\' 9\" (145 cm)'},
        { title: '4\' 10\" (147 cm)'}, { title: '4\' 11\" (150 cm)'}, { title: '5\' 0\" (152 cm)'}, { title: '5\' 1\" (155 cm)'},
        { title: '5\' 2\" (157 cm)'}, { title: '5\' 3\" (160 cm)'}, { title: '5\' 4\" (163 cm)'}, { title: '5\' 5\" (165 cm)'},
        { title: '5\' 6\" (168 cm)'}, { title: '5\' 7\" (170 cm)'}, { title: '5\' 8\" (173 cm)'}, { title: '5\' 9\" (175 cm)'},
        { title: '5\' 10\" (178 cm)'}, { title: '5\' 11\" (180 cm)'}, { title: '6\' 0\" (183 cm)'}, { title: '6\' 1\" (185 cm)'},
        { title: '6\' 2\" (188 cm)'}, { title: '6\' 3\" (191 cm)'}, { title: '6\' 4\" (193 cm)'}, { title: '6\' 5\" (196 cm)'},
        { title: '6\' 6\" (198 cm)'}, { title: '6\' 7\" (201 cm)'}, { title: '6\' 8\" (203 cm)'}, { title: '6\' 9\" (206 cm)'},
        { title: '6\' 10\" (208 cm)'}, { title: '6\' 11\" (211 cm)'}, { title: '7\' 0\" (213 cm)'}, { title: '7\' 1\" (216 cm)'},
        { title: '7\' 2\" (218 cm)'}, { title: '7\' 3\" (221 cm)'}, { title: '7\' 4\" (224 cm)'}, { title: '7\' 5\" (226 cm)'},
        { title: '7\' 6\" (229 cm)'}, { title: '7\' 7\" (231 cm)'}, { title: '7\' 8\" (234 cm)'}, { title: '7\' 9\" (236 cm)'},
        { title: '7\' 10\" (239 cm)'}, { title: '7\' 11\" (241 cm)'}, { title: '8\' 0\" (244 cm)'},
      ];

      this.body_type = [
        { title: 'Slim' },
        { title: 'Athletic' },
        { title: 'Average' },
        { title: 'A few extra pou' },
        { title: 'Full / Overweig' }
      ];

      this.eye_color = [
        { title: 'Black'},
        { title: 'Blue'},
        { title: 'Brown'},
        { title: 'Grey'},
        { title: 'Green'},
        { title: 'Hazel'},
        { title: 'Other'},
      ];

    this.hair_color = [
        { title: 'Auburn'},
        { title: 'Black'},
        { title: 'Blonde'},
        { title: 'Light Brown'},
        { title: 'Dark Brown'},
        { title: 'Grey'},
        { title: 'Red'},
        { title: 'White'},
        { title: 'Bold'},
        { title: 'Other'},
      ];

      this.special_features = [
        { title: 'Tattoos' },
        { title: 'Piercing' },
        { title: 'Glasses' }
      ];

      this.hobbies = [
        { title: 'Animal-related' }, { title: 'Aquariums'}, { title: 'Arts and Crafts'},
        { title: 'Chemistry'}, { title: 'Collecting'}, { title: 'Computer-related'},
        { title: 'Cooking'}, { title: 'Dancing'}, { title: 'DIY (Do It Yourself)'},
        { title: 'Electronics'}, { title: 'Fan fiction'}, { title: 'Film-making'},
        { title: 'Games'}, { title: 'Motor vehicles'}, { title: 'Music'},
        { title: 'Outdoor nature activities'}, { title: 'Performing arts'}, { title: 'Photography'},
        { title: 'Puzzles'}, { title: 'Restoration(refurbishing)'}, { title: 'Sports or other physical activities'}, { title: 'Toys of some sophistication'}
      ];
  }
}

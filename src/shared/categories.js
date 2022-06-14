const CATEGORY =[
  {
    name:'ART & Music',
    _id: 1,
    subCategories:[
      {
        name:'Film',
        _id: 2,
        subCategories:[]
      },
      {
        name:'Music',
        _id: 2,
        subCategories:[]
      },
      {
        name:'Fashion',
        _id: 3,
        subCategories:[]
      },
    ]
  },
  {
    name:'Sports',
    _id: 4,
    subCategories:[
      {
        name:'Soccer',
        _id: 5,
        subCategories:[
          {
            name:'European',
            _id: 8,
            subCategories:[]
          }
        ]
      },
      {
        name:'Basketball',
        _id: 6,
        subCategories:[]
      },
      {
        name:'Car Racing',
        _id: 7,
        subCategories:[]
      },
    ]
  },
  {
    name:'Social Science',
    _id: 8,
    subCategories:[
      {
        name:'Politics',
        _id: 9,
        subCategories:[]
      },
      {
        name:'Culture',
        _id: 10,
        subCategories:[]
      },
      {
        name:'Economics',
        _id: 11,
        subCategories:[]
      },
    ]
  }
]
export default CATEGORY;

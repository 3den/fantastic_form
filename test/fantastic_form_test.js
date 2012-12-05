function fixture(html){
  var $fixture = $("#qunit-fixture");
  return $fixture.html(html);
}

function setupForm(options){
  fixture(
    '<form>' +
      '<input id="field1" name="field1" type="text" validate="'+ options.inputValidate +'" />' +
      '<input id="field2" name="field2" type="text" validate="'+ options.inputValidate +'" />' +
      '<input id="field3" name="field3" type="text" />' +
    '</form>'
  );

  $form = $('form');
  $form.submit(function(e){ e.preventDefault(); })
  $form.fantasticForm.validate();
  return $form;
}

module("#validate(presence)", {
  setup: function() {
    this.form = setupForm({inputValidate: 'presence'});
    this.field = $("#field1");
  }
});

test("adds the 'error' class of an invalid field on submit", function() {
  this.field.val("");
  this.form.submit();

  ok(this.field.hasClass("error"));
});

test("removes the 'error' class of a valid field on submit", function() {
  this.field.val("some value").addClass("error");
  this.form.submit();

  ok(!this.field.hasClass("error"));
});

test("adds the 'error' class of an invalid field on change", function() {
  this.form.validateOnChange()
  this.field.val("");
  this.field.change();

  ok(this.field.hasClass("error"));
});

test("removes the 'error' class of a valid field on change", function() {
  this.form.validateOnChange()
  this.field.val("some value").addClass("error");
  this.field.change();

  ok(!this.field.hasClass("error"));
});


